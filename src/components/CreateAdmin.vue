<template>
  <div class="create-admin">
    <b-container>
      <b-row>
        <b-col>
          <b-card
            class="text-left mt-5"
            title="初期管理ユーザー作成"
          >
            <p class="card-text pt-4">
              <b-form>
                <b-form-group
                  id="lastNameGroup"
                  label-for="lastName"
                  label="姓"
                >
                  <b-form-input
                    id="lastName"
                    v-model="lastName"
                    type="text"
                  />
                </b-form-group>
                <b-form-group
                  id="firstNameGroup"
                  label-for="firstName"
                  label="名"
                >
                  <b-form-input
                    id="firstName"
                    v-model="firstName"
                    type="text"
                  />
                </b-form-group>
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
                  登録
                </b-button>
              </b-form>
            </p>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="modalCreateAdminComplete"
      title="確認"
      :ok-only="true"
      @hidden="finish"
    >
      <p class="my-4">
        {{ modalMessage }}
      </p>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'CreateAdmin',
  props: {
    serverUri: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      group: 'Admin',
      password: '',
      modalMessage: ''
    }
  },
  methods: {
    send: function (event) {
      const config = {
        headers: {
          'x-Requested-With': '*',
          'Access-Control-Allow-Origin': this.$props.serverUri
        }
      }
      var params = new URLSearchParams()
      params.append('firstName', this.firstName)
      params.append('lastName', this.lastName)
      params.append('email', this.email)
      params.append('group', this.group)
      params.append('password', this.password)
      this.$http.post(this.$props.serverUri + '/signUp', params, config)
        .then(response => {
          this.modalMessage = response.data.message
          this.$bvModal.show('modalCreateAdminComplete')
        })
    },
    finish: function (event) {
      this.$router.push({ path: 'signIn', params: {} })
    }
  }
}
</script>
