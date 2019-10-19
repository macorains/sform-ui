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
import axios from 'axios'
export default {
  name: 'signin',
  props: ['serverUri'],
  data: function () {
    return {
      email: '',
      group: '',
      password: '',
      formList: {}
    }
  },
  methods: {
    send: function (event) {
      let config = {
        headers: {
          'x-Requested-With': '*',
          'Access-Control-Allow-Origin': this.$props.serverUri
        }
      }
      var params = new URLSearchParams()
      params.append('email', this.email)
      params.append('group', this.group)
      params.append('password', this.password)
      axios.post(this.$props.serverUri + '/signIn', params, config)
        .then(response => {
          console.log(response)
          let token = response.headers['x-auth-token']
          localStorage.setItem('sformToken', token)
          this.$emit('updateIsAdmin', true)
          this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
        })
    }
  }
}
</script>

<style scoped>

</style>
