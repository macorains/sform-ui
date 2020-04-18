import Vue from 'vue'
import Axios from 'axios'
import router from '../router.js'

const http = Axios.create({
  withCredentials: true
})

http.interceptors.response.use(function (response) { return response }, function (error) {
  // 認証エラー時の処理
  var statusCode = error.response.status
  if (statusCode === 400) {
    const options = {
      duration: 2000,
      fullWidth: true,
      type: 'error',
      onComplete: function () {
        router.push({ path: '/signin' })
      }
    }
    Vue.toasted.show('エラーが発生しました', options)
  } else if (statusCode === 401 || statusCode === 403) {
    const options = {
      duration: 2000,
      fullWidth: true,
      type: 'error',
      onComplete: function () {
        router.push({ path: '/signin' })
      }
    }
    Vue.toasted.show('サインインしてください', options)
  } else {
    alert('error!')
  }
  return Promise.reject(error)
})

export default http
