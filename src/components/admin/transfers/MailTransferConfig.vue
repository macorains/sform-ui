<template>
  <div class="mailTransferConfig">
    <div class="container">
      <b-card :header="$t('message.sender_mail_addresses')" class="text-left">
        <b-row>
          <b-col cols="1">{{$t('message.number')}}</b-col>
          <b-col cols="4">{{$t('message.name')}}</b-col>
          <b-col>{{$t('message.email_address')}}</b-col>
        </b-row>
        <b-row class="mt-1" v-for="(data, index) in transferConfig.addressList" v-bind:key="index">
          <b-col cols="1">{{ index + 1 }}</b-col>
          <b-col cols="4">{{ data.name }}</b-col>
          <b-col>{{data.address}}</b-col>
        </b-row>
      </b-card>
      <b-btn class="mt-3" block v-b-modal.modal_mail_transfer_config_edit>
        <span class="oi oi-pencil" title="pencil" aria-hidden="true"></span>{{$t('message.edit')}}
      </b-btn>
    </div>
    <b-modal
        ref="modalMailTransferConfigEdit"
        id="modal_mail_transfer_config_edit"
        :title="$t('message.mail_transfer_setting')"
        size="lg"
        :hide-header-close="true"
        :hide-footer="true"
        @shown="modalInit">
      <b-container class="text-left">
        <b-card :header="$t('message.sender_mail_addresses')">
          <b-row>
            <b-col cols="1">{{$t('message.number')}}</b-col>
            <b-col cols="4">{{$t('message.name')}}</b-col>
            <b-col>{{$t('message.email_address')}}</b-col>
            <b-col></b-col>
          </b-row>
          <b-form-row class="mt-1" v-for="(data, index) in tmpTransferConfig.addressList" v-bind:key="index">
            <b-col cols="1">{{ index + 1 }}</b-col>
            <b-col cols="4"><b-form-input size="sm" v-model="data.name"/></b-col>
            <b-col><b-form-input size="sm" v-model="data.address"/></b-col>
            <b-col cols="1" class="text-right">
              <b-btn size="sm" @click="deleteAddress(index)">
                <span class="oi oi-trash" title="trash" aria-hidden="true"></span>{{$t('message.delete')}}
              </b-btn>
            </b-col>
          </b-form-row>
          <b-form-row class="mt-3">
            <b-col cols="12" class="text-center">
              <b-btn size="sm" @click="addAddress"><span class="oi oi-plus" title="plus" aria-hidden="true"></span>追加</b-btn>
            </b-col>
          </b-form-row>
        </b-card>
        <b-form-row class="mt-5 text-right">
          <b-col>
            <b-btn @click="endEdit"><span class="oi oi-x" title="cancel" aria-hidden="true"></span>キャンセル</b-btn>
            <b-btn @click="save"><span class="oi oi-plus" title="plus" aria-hidden="true"></span>保存</b-btn>
          </b-col>
        </b-form-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'mailTransferConfig',
  props: ['serverUri'],
  data: function () {
    return {
      transferConfig: {},
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
    axios.get(this.$props.serverUri + '/transfer/config/Mail', this.$data.config)
      .then(response => {
        this.$set(this.$data, 'transferConfig', response.data.dataset)
      })
  },
  methods: {
    modalInit: function () {
      this.$data.tmpTransferConfig = JSON.parse(JSON.stringify(this.$data.transferConfig))
      return ''
    },
    endEdit: function () {
      var newTmpTransferConfig = this.$data.tmpTransferConfig.addressList.filter(addr => {
        return addr.name !== '' && addr.address !== ''
      })
      this.$set(this.$data.tmpTransferConfig, 'addressList', newTmpTransferConfig)
      this.$refs.modalMailTransferConfigEdit.hide()
    },
    addAddress: function () {
      var tmp = {
        address: '',
        id: '',
        name: ''
      }
      var newIndex = Object.keys(this.$data.tmpTransferConfig.addressList).length
      this.$set(this.$data.tmpTransferConfig.addressList, newIndex, tmp)
    },
    deleteAddress: function (index) {
      this.$delete(this.$data.tmpTransferConfig.addressList, index)
    },
    save: function () {
      var reqdata = {
        rcdata: {
          transferName: 'Mail',
          config: this.$data.tmpTransferConfig
        }
      }
      axios.post(this.$props.serverUri + '/transfer/config', reqdata, this.$data.config)
        .then(response => {
          console.log(response)
          this.$data.transferConfig = JSON.parse(JSON.stringify(this.$data.tmpTransferConfig))
        }).catch(error => {
          console.log(error)
        })
      this.endEdit()
    }
  },
  i18n: {
    messages: {
      ja: {
        message: {
          delete: '削除',
          edit: '編集',
          email_address: 'メールアドレス',
          mail_transfer_setting: 'Mail転送設定',
          name: '名前',
          number: 'No.',
          sender_mail_addresses: '送信元メールアドレス'
        }
      },
      en: {
        message: {
          delete: 'Delete',
          edit: 'Edit',
          email_address: 'E-mail address',
          mail_transfer_setting: 'Mail Transfer Setting',
          name: 'Name',
          number: 'No.',
          sender_mail_addresses: 'Sender Mail Addresses'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
