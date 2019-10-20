<template>
  <div class="transferConfig">
    <div class="container">
      <b-card no-body>
        <b-tabs
          pills
          card
          vertical
        >
          <b-tab
            title="Salesforce"
            active
          >
            <salesforceTransferConfig :server-uri="serverUri" />
          </b-tab>
          <b-tab title="Mail">
            <mail-transfer-config :server-uri="serverUri" />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import SalesforceTransferConfig from './SalesforceTransferConfig.vue'
import MailTransferConfig from './MailTransferConfig.vue'

export default {
  name: 'TransferConfig',
  components: {
    salesforceTransferConfig: SalesforceTransferConfig,
    mailTransferConfig: MailTransferConfig
  },
  props: {
    'serverUri': {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
</style>
