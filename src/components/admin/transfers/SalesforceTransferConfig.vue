<template>
  <div class="salesforceTransferConfig">
    <div class="container">
      <b-container class="text-left">
        <b-row class="mb-3">
          <b-col cols="3">ユーザー名</b-col>
          <b-col></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">パスワード</b-col>
          <b-col>********</b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">セキュリティトークン</b-col>
          <b-col>********</b-col>
        </b-row>
      </b-container>
      <b-btn class="mt-3" block >変更</b-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'salesforceTransferConfig',
  props: ['serverUri'],
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri
      }
    }
    axios.get(this.$props.serverUri + 'transfer/config/Salesforce', this.$data.config)
    .then(response => {
      console.log(response.data)
    })
  }
}
</script>

<style scoped>
</style>