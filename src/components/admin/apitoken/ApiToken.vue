<template>
  <div class="admin">
    <div class="container">
      <p v-if="expiry">
        {{ $t('message.expiry_for_apitoken') }}: {{ expiry }}
        <b-btn
          size="sm"
          @click="generate()"
        >
          <span
            class="oi oi-reload"
            title="update"
            aria-hidden="true"
          />
          {{ $t('message.update_') }}
        </b-btn>
      </p>
      <p v-else>
        {{ $t('message.apitoken_not_found') }}&nbsp;
        <b-btn
          size="sm"
          @click="generate()"
        >
          <span
            class="oi oi-flash"
            title="create"
            aria-hidden="true"
          />
          {{ $t('message.create') }}
        </b-btn>
      </p>
      <div
        v-if="apiToken"
        class="alert alert-warning"
        role="alert"
      >
        <p>
          {{ apiToken }}
        </p>
        <p>
          {{ $t('message.apitoken_alert') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ApiToken',
  data: function () {
    return {
      apiToken: '',
      expiry: ''
    }
  },
  created: function () {
    this.load()
  },
  methods: {
    load: function () {
      this.$http.get('/apitoken/expiry')
        .then(response => {
          console.log(response)
          this.$data.expiry = response.data.expiry
        })
        .catch(error => {
          // TODO 何か工夫する？
          console.log(error)
        })
    },
    generate: function () {
      this.$http.get('/apitoken/generate')
        .then(response => {
          console.log(response)
          this.$data.apiToken = response.data.token
          const requestData = {
            token: this.$data.apiToken,
            expiry_days: 30
          }
          this.$http.post('/apitoken', requestData)
            .then(saveResponse => {
              console.log(saveResponse)
            })
        })
    }
  }
}
</script>
