<template>
  <div id="app">
    <!-- nav -->
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">SForm</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#" v-on:click="openFormList()">
            <span class="oi oi-spreadsheet" title="spreadsheet" aria-hidden="true"></span>{{$t("message.form")}}
          </b-nav-item>
          <b-nav-item href="#" v-on:click="openAdmin()" v-show="isAdmin">
            <span class="oi oi-cog" title="cog" aria-hidden="true"></span>{{$t("message.admin")}}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">JP</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em><span class="oi oi-person" title="person" aria-hidden="true"></span>{{$t("message.user")}}</em>
            </template>
            <b-dropdown-item href="#">
              <span class="oi oi-list" title="list" aria-hidden="true"></span>{{$t("message.profile")}}
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="signout()">
              <span class="oi oi-account-logout" title="account-logout" aria-hidden="true"></span>{{$t("message.signout")}}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    
    <router-view :serverUri="serverUri" :hashedFormId="hashedFormId" @updateHashedFormId="updateHashedFormId"></router-view>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data: function () {
    return {
      serverUri: 'http://localhost:9001/',
      hashedFormId: '',
      isAdmin: false
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    var config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$data.serverUri
      }
    }
    axios.get(this.$data.serverUri + 'user/isadmin', config)
    .then(response => {
      this.$data.isAdmin = true
    })
    .catch(error => {
      console.log(error.response)
      this.$data.isAdmin = false
    })
  },
  methods: {
    updateHashedFormId: function (hashedFormId) {
      this.$data.hashedFormId = hashedFormId
    },
    openFormList: function () {
      this.$router.push({path: 'formlist', params: {serverUri: this.$data.serverUri}})
    },
    openAdmin: function () {
      this.$router.push({path: 'admin', params: {serverUri: this.$data.serverUri}})
    },
    signout: function () {
      localStorage.removeItem('sformToken')
      this.$router.push({path: 'signin'})
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
