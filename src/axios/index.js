import Axios from 'axios'
import router from '../router.js'

const http = Axios.create({
  withCredentials: true
})

http.interceptors.response.use(function (response) { return response }, function (error) {
  // 認証エラー時の処理
  var statusCode = error.response.status
  if (statusCode === 400) {
    alert('400!')
    router.push({ path: 'signin' })
  } else if (statusCode === 401 || statusCode === 403) {
    alert('error!!')
    router.push({ path: '/signin' })
  } else {
    alert('error!')
  }
  return Promise.reject(error)
})

export default http
