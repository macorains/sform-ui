<template>
  <b-modal
    id="modal_transfer_config_add"
    ref="modalTransferConfigAdd"
    :title="$t('message.transfer_config_add')"
    :ok-title="$t('message.add')"
    :cancel-title="$t('message.cancel')"
    size="lg"
    :hide-header-close="true"
    :visible="isVisible"
    @shown="modalInit()"
    @close="modalClose()"
    @hide="modalClose()"
    @ok="add()"
  >
    <b-container class="text-left">
      <b-form-row>
        <b-col>
          <b-form-group
            v-slot="{ ariaDescribedby }"
            :label="$t('message.add_transfer_config')"
          >
            <b-form-radio
              v-model="selectedTransferType"
              :aria-describedby="ariaDescribedby"
              name="transfer-type"
              value="mail"
            >
              Mail
            </b-form-radio>
            <b-form-radio
              v-model="selectedTransferType"
              :aria-describedby="ariaDescribedby"
              name="transfer-type"
              value="salesforce"
            >
              Salesforce
            </b-form-radio>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-container>
  </b-modal>
</template>
<script>
export default {
  name: 'TransferConfigAdd',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      transferConfig: {
        detail: {
          mail: null,
          salesforce: null
        }
      },
      defaultConfig: {
        mail: {
          use_cc: false,
          use_bcc: false,
          use_replyto: false,
          mail_address_list: []
        },
        salesforce: {
          sf_domain: '',
          api_version: '',
          sf_user_name: '',
          sf_password: '',
          sf_client_id: '',
          sf_client_secret: '',
          iv_user_name: '',
          iv_password: '',
          iv_client_id: '',
          iv_client_secret: ''
        }
      },
      selectedTransferType: ''
    }
  },
  methods: {
    modalInit: function () {
      // TODO 必要な処理があれば追加、↓の部分は不要と思われるので別途削除 (2023/07/20)
      /*
      this.$http.get('/transfer/config/' + this.$props.transferConfigId)
        .then(response => {
          this.$data.transferConfig = response.data
        })
      */
    },
    modalClose: function () {
      this.$data.newName = null
      this.$data.newAddress = null
      this.$emit('changeModalState', 'transferConfigAdd', false)
    },
    add: function (index) {
      // alert(this.$data.selectedTransferType)
      const transferType = this.$data.selectedTransferType
      const data = JSON.parse(JSON.stringify(this.$data.transferConfig))
      data.detail[transferType] = JSON.parse(JSON.stringify(this.$data.defaultConfig[transferType]))
      // TODO TransferConfigを追加するコードを追加する (2023/07/20)
      // POST /transfer/config/ で追加できる
      this.$http.post('/transfer/config', data).then(response => {
        console.info('hoge') // TODO 何か処理入れる (2023/08/19)
        console.log(response)
      })
    }
  }
}
</script>
