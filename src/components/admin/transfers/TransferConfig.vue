<template>
  <div class="transferConfig">
    <div class="container">
      <b-card no-body>
        <b-tabs pills card vertical>
          <b-tab title="Salesforce" active>
            <salesforceTransferConfig v-bind:serverUri="serverUri"></salesforceTransferConfig>
          </b-tab>
          <b-tab title="Mail">
            <mail-transfer-config v-bind:serverUri="serverUri"></mail-transfer-config>
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
  props: ['serverUri'],
  components: {
    salesforceTransferConfig: SalesforceTransferConfig,
    mailTransferConfig: MailTransferConfig
  }
}
</script>

<style scoped>
</style>
