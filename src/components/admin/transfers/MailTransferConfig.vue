<template>
  <div class="mailTransferConfig">
    <div class="container">
      MailTransferConfig
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mailTransferConfig',
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
    axios.get(this.$props.serverUri + 'transfer/config/Mail', this.$data.config)
    .then(response => {
      console.log(response.data)
    })
  }

}
</script>

<style scoped>
</style>