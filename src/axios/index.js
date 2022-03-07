import Axios from 'axios'

const http = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})

http.interceptors.response.use(function (response) { return response }, function (error) {
  return Promise.reject(error)
})

export default http
