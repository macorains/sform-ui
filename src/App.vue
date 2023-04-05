<template>
  <div id="app">
    <!-- nav -->
    <b-navbar
      toggleable="md"
      type="dark"
      variant="info"
    >
      <b-navbar-toggle target="nav_collapse" />
      <b-navbar-brand href="#">
        SForm
      </b-navbar-brand>
      <b-collapse
        id="nav_collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item
            v-show="isMenuValid()"
            href="#"
            @click="openFormList()"
          >
            <span
              class="oi oi-spreadsheet"
              title="spreadsheet"
              aria-hidden="true"
            />
            {{ $t("message.form") }}
          </b-nav-item>
          <b-nav-item
            v-show="isAdmin && isMenuValid()"
            href="#"
            @click="openAdmin()"
          >
            <span
              class="oi oi-cog"
              title="cog"
              aria-hidden="true"
            />
            {{ $t("message.admin") }}
          </b-nav-item>
          <b-nav-item
            v-show="isMenuValid()"
            href="#"
            @click="openOnlineHelp()"
          >
            <span
              class="oi oi-question-mark"
              title="question-mark"
              aria-hidden="true"
            />
            {{ $t("message.help") }}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            v-show="isMenuValid()"
            text="Lang"
            right
          >
            <b-dropdown-item href="#">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#">
              JP
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            v-show="isMenuValid()"
            right
          >
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>
                <span
                  class="oi oi-person"
                  title="person"
                  aria-hidden="true"
                />
                {{ $t("message.user") }}
              </em>
            </template>
            <b-dropdown-item href="#">
              <span
                class="oi oi-list"
                title="list"
                aria-hidden="true"
              />
              {{ $t("message.profile") }}
            </b-dropdown-item>
            <b-dropdown-item
              href="#"
              @click="signout()"
            >
              <span
                class="oi oi-account-logout"
                title="account-logout"
                aria-hidden="true"
              />
              {{ $t("message.signout") }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view
      :hashed-form-id="hashedFormId"
      @updateHashedFormId="updateHashedFormId"
      @updateIsAdmin="updateIsAdmin"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      hashedFormId: '',
      isAdmin: false,
      axiosTimeout: 3000,
      errorMessage: this.$i18n.t('message.error'),
      noMenuPages: ['/signin', '/help', '/codeinput', '/', '/activate']
    }
  },
  created: function () {
    const token = JSON.parse(localStorage.getItem('sformToken'))
    console.log(token)
    const clientId = process.env.VUE_APP_GCP_CLIENT_ID
    const scope = process.env.VUE_APP_GCP_SCOPE
    // const redirectUri = process.env.VUE_APP_GCP_REDIRECT_URI
    const redirectUri = 'https://admin.it.sform.app/api/oauthToken'
    const requestUri = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`

    if (token) {
      this.$http.defaults.headers.common['X-Auth-Token'] = token
      this.$http.get('/user/isadmin').then(response => {
        this.$data.isAdmin = true
      }).catch(function (error) {
        console.log(error)
        if (error.response && error.response.status === 403) {
          this.$data.isAdmin = false
        } else {
          location.href = requestUri
        }
      })
    } else {
      location.href = requestUri
      /*
      if (!this.$route.path.startsWith('/activate')) {
        this.$http.get('/oauthTokenString')
          .then(tokenResponse => {
            const token = tokenResponse.data.token
            console.log('*** token ***')
            console.log(token)
            localStorage.setItem('sformToken', token)
            if (tokenResponse.data.token === '') {
              // TODO エラーハンドリング
              alert('Can\'t get token!')
            } else {
              // TODO adminExistsCheck
              this.$http.defaults.headers.common['X-Auth-Token'] = token
              // this.$router.push('signin', () => {})
              // alert('error2')
              // location.href = requestUri
            }
          })
      }
      */
    }

    window.addEventListener('error', event => {
      if (this.$route.path === '/signin') {
        this.$data.isAdmin = false
      } else {
        this.$bvModal.msgBoxOk(this.convertMessage(event), {
          title: this.$i18n.t('message.error')
        })
          .then(trigger => {
            if (event.reason.response.status === 401 || event.reason.response.status === 403) {
              this.$router.push('signin', () => {})
            }
          })
      }
    })

    window.addEventListener('unhandledrejection', event => {
      if (this.$route.path === '/signin') {
        this.$data.isAdmin = false
      } else {
        this.$bvModal.msgBoxOk(this.convertMessage(event), {
          title: this.$i18n.t('message.error')
        })
          .then(trigger => {
            const status = event.reason.response?.status
            if (status != null && (status === 401 || status === 403)) {
              this.$router.push('signin', () => {})
            }
          })
      }
    })
  },
  methods: {
    updateHashedFormId: function (hashedFormId) {
      this.$data.hashedFormId = hashedFormId
    },
    updateIsAdmin: function (isAdmin) {
      this.$data.isAdmin = isAdmin
    },
    openFormList: function () {
      this.$router.push({ path: 'formlist' })
    },
    openAdmin: function () {
      this.$router.push({ path: 'admin' })
    },
    openOnlineHelp: function () {
      const routeData = this.$router.resolve({ name: 'help' })
      window.open(routeData.href, '_blank')
    },
    signout: function () {
      this.$http.get('/signOut').then(response => {
        localStorage.removeItem('sformToken')
        this.$http.defaults.headers.common['X-Auth-Token'] = null
        this.$router.push({ path: 'signin' })
      })
    },
    isMenuValid: function () {
      var res = true
      if (this.$data.noMenuPages.indexOf(this.$route.path) >= 0) {
        res = false
      }
      return res
    },
    convertMessage: function (evt) {
      console.log(evt)
      const msg = evt.reason.response?.data.message
      const statusCode = evt.reason.response?.status
      if (statusCode === 400) {
        if (msg) {
          if (msg.indexOf('InvalidPasswordException') > 0) {
            return this.$i18n.t('message.error_invalid_password_exception')
          }
          if (msg === 'LoginFailureLimitExceeded') {
            return this.$i18n.t('message.error_login_failure_limit_exceeded')
          }
          if (msg === 'Invalid Verification Request' || msg === 'Verification Timeout') {
            return this.$i18n.t('message.error_verification_failed')
          }
        }
      }
      if (statusCode === 401 || statusCode === 403) {
        localStorage.removeItem('sformToken')
        return this.$i18n.t('message.error_authorization')
      }
      if (statusCode === 404) {
        if (msg && (msg.indexOf('IdentityNotFoundException') > 0 || msg.indexOf('InvalidPasswordException') > 0)) {
          return this.$i18n.t('message.error_user_not_found')
        }
      }
      return this.$i18n.t('message.error_undefined')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.loader,
.loader:before,
.loader:after {
  background: #aaaaaa;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #666666;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
</style>
