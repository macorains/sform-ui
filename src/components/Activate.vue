<template>
  <div class="activate">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: 'Activate',
  data: function () {
    return {
      message: ''
    }
  },
  created: function () {
    const activationId = this.$route.params.id
    this.$http.get(`/account/activate/${activationId}`).then(response => {
      this.$data.message = 'アクティベーションが完了しました'
    }).catch(error => {
      if (error.response.status === 400) {
        this.$data.message = 'アクティベーションキーが存在しないか有効期限切れです'
        return false
      }
    })
  }
}
</script>
