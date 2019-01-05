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
          <b-nav-item href="#" v-on:click="openAdmin()">
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
export default {
  name: 'app',
  data: function () {
    return {
      serverUri: 'http://localhost:9001/',
      hashedFormId: ''
    }
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
</style>
