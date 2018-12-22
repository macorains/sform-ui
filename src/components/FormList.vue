<template>
  <div class="form_list">
    <div class="container">
    <h1>FormList</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">フォーム名</th>
          <th scope="col">タイトル</th>
          <th scope="col">状態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in formList" v-bind:key="item.id" v-on:click="edit(item.hashed_id)">
          <td scope="row">{{item.hashed_id}}</td>
          <td scope="row">{{item.name}}</td>
          <td scope="row">{{item.title}}</td>
          <td scope="row">{{item.status}}</td>
        </tr>
      </tbody>
    </table>
    <b-button class="mt-4">Add Form</b-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'form_list',
  props: ['serverUri'],
  data: function () {
    return {
      formList: {},
      serverUriString: ''
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    if (!this.$props.serverUri) {
      this.$router.push({path: 'signin'})
    }
    this.$data.serverUriString = this.$props.serverUri
    let config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$data.serverUriString
      }
    }
    axios.get(this.$props.serverUri + 'form/list', config)
    .then(response => {
      console.log(response)
      this.$data.formList = JSON.parse(response.data.dataset)
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
  },
  methods: {
    edit: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({name: 'formedit', params: {hashedFormId: hashedId}})
    }
  }
}
</script>


<style scoped>

</style>
