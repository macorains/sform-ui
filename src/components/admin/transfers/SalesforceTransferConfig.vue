<template>
  <div class="salesforceTransferConfig">
    <div class="container">
      <b-container class="text-left">
        <b-row class="mb-3">
          <b-col cols="3">
            ユーザー名
          </b-col>
          <b-col />
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">
            パスワード
          </b-col>
          <b-col>
            ********
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">
            セキュリティトークン
          </b-col>
          <b-col>
            ********
          </b-col>
        </b-row>
      </b-container>
      <b-btn
        v-b-modal.modal_salesforce_transfer_config_edit
        class="mt-3"
        block
      >
        <span
          class="oi oi-pencil"
          title="pencil"
          aria-hidden="true"
        />
        {{ $t("message.edit") }}
      </b-btn>
    </div>
    <b-modal
      id="modal_salesforce_transfer_config_edit"
      ref="modalSalesforceTransferConfigEdit"
      title="Salesforce設定"
      :hide-header-close="true"
      :hide-footer="true"
      @shown="modalInit"
      @hide="endEdit"
    >
      <b-container class="text-left">
        <b-form-row>
          <b-col>
            <b-form-group
              id="userGroup"
              label-for="user"
              :label="$t('message.username')"
            >
              <b-form-input
                id="user"
                v-model="tmpTransferConfig.user"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group
              id="passwordGroup"
              label-for="password"
              :label="$t('message.password')"
            >
              <b-form-input
                id="password"
                v-model="tmpTransferConfig.password"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group
              id="securityTokenGroup"
              label-for="security_token"
              :label="$t('message.security_token')"
            >
              <b-form-input
                id="security_token"
                v-model="tmpTransferConfig.securityToken"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row class="mt-5 text-right">
          <b-col>
            <b-btn @click="endEdit">
              <span
                class="oi oi-x"
                title="cancel"
                aria-hidden="true"
              />
              キャンセル
            </b-btn>
            <b-btn @click="save">
              <span
                class="oi oi-plus"
                title="plus"
                aria-hidden="true"
              />
              保存
            </b-btn>
          </b-col>
        </b-form-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SalesforceTransferConfig',
  props: {
    'serverUri': {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      tmpTransferConfig: {}
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri
      }
    }
    axios.get(this.$props.serverUri + '/transfer/config/Salesforce', this.$data.config)
      .then(response => {
        this.$set(this.$data, 'tmpTransferConfig', response.data.dataset)
      })
  },
  methods: {
    modalInit: function () {
      return ''
    },
    endEdit: function () {
      this.$refs.modalSalesforceTransferConfigEdit.hide()
    },
    save: function () {
      var reqdata = {
        rcdata: {
          transferName: 'Salesforce',
          config: this.$data.tmpTransferConfig
        }
      }
      axios.post(this.$props.serverUri + '/transfer/config', reqdata, this.$data.config)
        .then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      this.endEdit()
    }
  }
}
</script>

<style scoped>
</style>
