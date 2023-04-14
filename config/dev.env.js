var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_API_URL: '"http://localhost:9001"',
  VUE_APP_GCP_CLIENT_ID: '"485408982983-42gd7gfheac6vbfs8seb7nlsrfibcvma.apps.googleusercontent.com"',
  VUE_APP_GCP_SCOPE: '"https://www.googleapis.com/auth/cloud-platform"',
  VUE_APP_GCP_REDIRECT_URI: '"http://localhost:8081"'
})
