<template>
  <div class="transferConfig">
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              No.
            </th>
            <th scope="col">
              {{ $t('message.transfer_config_name') }}
            </th>
            <th scope="col">
              {{ $t('message.status') }}
            </th>
            <th scope="col">
              {{ $t('message.transfer_type') }}
            </th>
            <th scope="col">
              {{ $t('message.action') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in transferConfigList"
            :key="item.config_index"
          >
            <th scope="row">
              {{ Number(item.config_index) + 1 }}
            </th>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.status }}
            </td>
            <td>
              {{ item.type_code }}
            </td>
            <td>
              <b-btn
                size="sm"
                @click="edit(item.config_index)"
              >
                <span
                  class="oi oi-pencil"
                  title="pencil"
                  aria-hidden="true"
                />
                {{ $t('message.edit') }}
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <mailTransferConfig
      :is-visible="modalState.Mail"
      :transfer-config-id="transferConfigId"
      @changeModalState="changeModalState"
    />
    <salesforceTransferConfig
      :is-visible="modalState.Salesforce"
      :transfer-config-id="transferConfigId"
      @changeModalState="changeModalState"
    />
  </div>
</template>
<script>
import MailTransferConfig from './MailTransferConfig.vue'
import SalesforceTransferConfig from './SalesforceTransferConfig.vue'
export default {
  name: 'TransferConfig',
  components: {
    mailTransferConfig: MailTransferConfig,
    salesforceTransferConfig: SalesforceTransferConfig
  },
  data: function () {
    return {
      transferConfigList: [],
      transferConfigId: 0,
      modalState: {
        Salesforce: false,
        Mail: false
      }
    }
  },
  created: function () {
    this.$http.get('/transfer/config/list')
      .then(response => {
        this.$data.transferConfigList = response.data
      })
  },
  methods: {
    edit: function (index) {
      const target = this.$data.transferConfigList[index]
      this.$data.transferConfigId = target.id
      this.$data.modalState[target.type_code] = true
    },
    changeModalState: function (target, state) {
      this.$data.modalState[target] = state
    }

  }
}
</script>

<style scoped>
</style>
