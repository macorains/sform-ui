<template>
  <div class="userConfig">
    <div class="container">
      users
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>EMail</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in userlist" v-bind:key="index">
            <td>{{index}}</td>
            <td>{{user.lastName + ' ' + user.firstName}}</td>
            <td>{{user.email}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'user-config',
  props: ['serverUri'],
  data: function () {
    return {
      config: {},
      userlist: []
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri
      }
    }
    axios.get(this.$props.serverUri + 'user', this.$data.config)
    .then(response => {
      console.log(response.data)
      this.$data.userlist = response.data.dataset
    })
    .catch(error => {
      if (error.response) {
        var statusCode = error.response.status
        if (statusCode === 401 || statusCode === 403) {
          this.$router.push({path: 'signin'})
        } else {
          console.log(error.response)
        }
      }
    })
  }
}
</script>

<style scoped>
</style>

