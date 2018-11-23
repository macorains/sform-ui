<template>
  <div class="signin">
    <b-container>
      <b-row>
        <b-col>
          <b-card class="text-left mt-5" title="Signin">
            <p class="card-text pt-4">
              <b-form>
                <b-form-group id="emailGroup" label-for="email" label="メールアドレス">
                  <b-form-input id="email" type="email" v-model="email"></b-form-input>
                </b-form-group>
                <b-form-group id="groupGroup" label-for="group" label="グループ名">
                  <b-form-input id="group" type="text" v-model="group"></b-form-input>
                </b-form-group>
                <b-form-group id="passwordGroup" label-for="password" label="パスワード">
                  <b-form-input id="password" type="password" v-model="password"></b-form-input>
                </b-form-group>
                <b-button class="mt-4" v-on:click="send">Signin</b-button>
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
      password: ''
    }
  },
  methods: {
    send: function (event) {
      console.log(this.email)
      console.log(this.serverUri)
      let config = {
        headers: {
          'x-Requested-With': '*',
          'Access-Control-Allow-Origin': 'http://localhost:9001'
        }
      }
      var params = new URLSearchParams()
      params.append('email', this.email)
      params.append('group', this.group)
      params.append('password', this.password)
      axios.post(this.serverUri + 'signIn', params, config)
      .then(response => console.log(response))
    }
  }
}

</script>


<style scoped>

</style>
