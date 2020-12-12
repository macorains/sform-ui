import Axios from 'axios'

const http = Axios.create({
  withCredentials: true
})

http.interceptors.response.use(function (response) { return response }, function (error) {
  console.log(error)
  return Promise.reject(error)
})

export default http
