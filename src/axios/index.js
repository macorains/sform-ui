import Vue from 'vue'
import Axios from 'axios'
import router from '../router.js'

const http = Axios.create({
  withCredentials: true
})

http.interceptors.response.use(function (response) { return response }, function (error) {
  if (error.response) {
    // 認証エラー時の処理
    var statusCode = error.response.status
    if (statusCode === 400) {
      const options = {
        duration: 2000,
        fullWidth: true,
        type: 'error',
        onComplete: function () {
          router.push({ path: '/signIn' }).catch(err => { console.log(err) })
        }
      }
      Vue.toasted.show('エラーが発生しました', options)
    } else if (statusCode === 401 || statusCode === 403) {
      const config = {
        headers: {
          'x-Requested-With': '*',
          'Access-Control-Allow-Origin': this.$props.serverUri
        }
      }
      this.$http.get(this.$props.serverUri + '/adminExistsCheck', config)
        .then(response => {
          if (response.data.result === false) {
            router.push({ path: 'createadmin' })
          } else {
            const options = {
              duration: 2000,
              fullWidth: true,
              type: 'error',
              onComplete: function () {
                router.push({ path: '/signIn' }).catch(err => { console.log(err) })
              }
            }
            Vue.toasted.show('サインインしてください', options)
          }
        })
    } else {
      alert('error!')
    }
  } else {
    alert('Network Error!!')
  }
  return Promise.reject(error)
})

export default http
