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
              {{ Number(item.config_index) }}
            </th>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.status == 1 ? '有効' : '無効' }}
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
      <b-row>
        <b-col>
          <b-btn
            class="mt-4"
            @click="addTransferConfig"
          >
            <span
              class="oi oi-plus"
              title="plus"
              aria-hidden="true"
            />
            {{ $t("message.add_transfer_config") }}
          </b-btn>
        </b-col>
      </b-row>
    </div>
    <transferConfigAdd
      :is-visible="modalState.transferConfigAdd"
      @changeModalState="changeModalState"
    />
    <mailTransferConfig
      :is-visible="modalState.mail"
      :transfer-config-id="transferConfigId"
      @changeModalState="changeModalState"
    />
    <salesforceTransferConfig
      :is-visible="modalState.salesforce"
      :transfer-config-id="transferConfigId"
      @changeModalState="changeModalState"
    />
  </div>
</template>
<script>
import MailTransferConfig from './MailTransferConfig.vue'
import SalesforceTransferConfig from './SalesforceTransferConfig.vue'
import TransferConfigAdd from './TransferConfigAdd'
export default {
  name: 'TransferConfig',
  components: {
    transferConfigAdd: TransferConfigAdd,
    mailTransferConfig: MailTransferConfig,
    salesforceTransferConfig: SalesforceTransferConfig
  },
  data: function () {
    return {
      transferConfigList: [],
      transferConfigId: 0,
      modalState: {
        transferConfigAdd: false,
        salesforce: false,
        mail: false
      }
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      this.$http.get('/transfer/config/list')
        .then(response => {
          this.$data.transferConfigList = response.data
        })
    },
    edit: function (index) {
      const target = this.$data.transferConfigList.filter(config => config.config_index === index)[0]
      this.$data.transferConfigId = target.id
      this.$data.modalState[target.type_code] = true
    },
    changeModalState: function (target, state) {
      this.$data.modalState[target] = state
      if (!state) {
        this.getList()
      }
    },
    addTransferConfig: function () {
      this.$data.modalState.transferConfigAdd = true
    }
  }
}
</script>

<style scoped>
</style>
