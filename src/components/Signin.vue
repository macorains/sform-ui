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
    this.$http.get('/adminExistsCheck')
      .then(response => {
        if (response.data.result === false) {
          this.$router.push({ path: 'createadmin', params: {} })
        }
      })
  },
  methods: {
    send: function (event) {
      var params = new URLSearchParams()
      params.append('email', this.email)
      params.append('group', this.group)
      params.append('password', this.password)
      this.$http.post('/signIn', params)
        .then(response => {
          this.$emit('updateIsAdmin', true)
          this.$router.push({ name: 'codeinput', params: { formToken: response.data.formToken } }).catch(err => { console.log(err) })
        })
    }
  }
}
</script>

<style scoped>

</style>
