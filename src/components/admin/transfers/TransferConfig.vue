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
            <salesforceTransferConfig :serverUri="serverUri" />
          </b-tab>
          <b-tab title="Mail">
            <mail-transfer-config :serverUri="serverUri" />
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
  name: 'transferConfig',
  components: {
    salesforceTransferConfig: SalesforceTransferConfig,
    mailTransferConfig: MailTransferConfig
  },
  props: ['serverUri']
}
</script>

<style scoped>
</style>
