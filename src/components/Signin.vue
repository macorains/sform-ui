<template>
  <div class="signin">
    <b-container>
      <b-row>
        <b-col>
          <b-card
            class="text-left mt-5"
            title="Signin"
          >
            <p class="card-text pt-4">
              <b-form>
                <b-form-group
                  id="emailGroup"
                  label-for="email"
                  label="メールアドレス"
                >
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                  />
                </b-form-group>
                <b-form-group
                  id="groupGroup"
                  label-for="group"
                  label="グループ名"
                >
                  <b-form-input
                    id="group"
                    v-model="group"
                    type="text"
                  />
                </b-form-group>
                <b-form-group
                  id="passwordGroup"
                  label-for="password"
                  label="パスワード"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                  />
                </b-form-group>
                <b-button
                  class="mt-4"
                  @click="send"
                >
                  Signin
                </b-button>
              </b-form>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  name: 'Signin',
  data: function () {
    return {
      email: '',
      group: '',
      password: '',
      formList: {}
    }
  },
  created: function () {
    console.log('signin')
  },
  methods: {
    send: function (event) {
      this.$http.get('https://www.gstatic.com/iap/verify/public_key-jwk')
        .then(response => {
          const publicKeys = response.keys

          // JWTライブラリを使用してトークンを検証する
          const ticket = await jwt.verify(idToken, (header, callback) => {
            const kid = header.kid;
            const publicKey = publicKeys.find(key => key.kid === kid);
            if (publicKey) {
              const cert = google.auth.JWT.fromJSON(publicKey);
              callback(null, cert);
            } else {
              callback(new Error('Invalid key ID'));
            }
          });

          console.log('***** ticket *****')
          console.log(ticket)

          var params = new URLSearchParams()
          params.append('username', this.email)
          params.append('group', this.group)
          params.append('password', this.password)

          const token = localStorage.getItem('sformToken')
          console.log('***** token *****')
          console.log(token)
          this.$http.defaults.headers.common.Authorization = 'Bearer ' + token

        })


      this.$http.post('/signIn', params)
        .then(response => {
          this.$emit('updateIsAdmin', true)
          console.log(response.data)
          this.$router.push({ name: 'codeinput', params: { authkey: response.data.authkey } }).catch(err => { console.log(err) })
        }).catch(function (error) {
          console.log(error.response)
        })
    }
  }
}
</script>

<style scoped>

</style>
