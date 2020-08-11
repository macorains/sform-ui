<template>
  <div class="codeinput">
    <b-container>
      <b-row>
        <b-col>
          <b-card
            class="text-left mt-5"
            :title="$t('message.code_input')"
          >
            <p class="card-text pt-4">
              <b-form @submit.stop.prevent>
                <b-form-group
                  id="codeGroup"
                  label-for="code"
                  :label="$t('message.code_input_description')"
                >
                  <b-form-input
                    id="code"
                    v-model="code"
                    type="text"
                  />
                </b-form-group>
                <b-button
                  class="mt-4"
                  @click="send"
                >
                  {{ $t('message.send') }}
                </b-button>
                <b-button
                  class="mt-4"
                  @click="resignin"
                >
                  {{ $t('message.re_signin') }}
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
  name: 'CodeInput',
  props: {
    serverUri: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      code: '',
      formToken: ''
    }
  },
  created: function () {
    this.$data.formToken = this.$route.params.formToken
  },
  methods: {
    send: function (event) {
      const config = {
        headers: {
          'x-Requested-With': '*',
          'Access-Control-Allow-Origin': this.$props.serverUri
        }
      }
      var reqdata = {
        form_token: this.$data.formToken,
        verification_code: this.$data.code
      }
      this.$http.post(this.$props.serverUri + '/verification', reqdata, config)
        .then(response => {
          console.log(response)
          const token = response.headers['x-auth-token']
          localStorage.setItem('sformToken', token)
          this.$router.push({ path: 'formlist', params: { serverUri: this.$props.serverUri } })
        })
    },
    resignin: function () {
      this.$router.push({ path: 'signin', params: { serverUri: this.$props.serverUri } })
    }
  }
}
</script>
