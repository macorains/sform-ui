<template>
  <div class="transferConfig">
    <div class="container">
    </div>
  </div>
</template>
<script>
export default {
  name: 'TransferConfig',
  props: {
    serverUri: {
      type: String,
      default: ''
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        timeout: 3000
      }
    }
    this.$http.get(this.$props.serverUri + '/transfer/config/list', this.$data.config)
      .then(response => {
        console.log(response)
      })
  }
}
</script>

<style scoped>
</style>
