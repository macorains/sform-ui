<template>
  <div class="mail-transfer-edit">
    <b-modal size="lg" ref="modalMailTransferRuleSetting" hide-footer title="MailTransfer設定" @hide="updateModalState">
    <b-container class="text-left">
      <b-row class="mb-3">
        <b-col cols="3">転送タスク名</b-col>
        <b-col><b-form-input id="transferTask.name" type="text" v-model="tmpTransferTask.name"></b-form-input></b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3">メール件名</b-col>
        <b-col><b-form-input id="transferTask.config.mailSubject" type="text" v-model="tmpTransferTask.config.mailSubject"></b-form-input></b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3">メール送信元</b-col>
        <b-col><b-form-input id="transferTask.config.mailFrom" type="text" v-model="tmpTransferTask.config.mailFrom"></b-form-input></b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3">メール送信先</b-col>
        <b-col><b-form-input id="transferTask.config.mailTo" type="text" v-model="tmpTransferTask.config.mailTo"></b-form-input></b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3">メール本文</b-col>
        <b-col>
          <b-form-textarea id="transferTask.config.mailBody" v-model="tmpTransferTask.config.mailBody" :rows="10">
          </b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col cols="3"></b-col>
        <b-col cols="5">
          <b-form-select v-model="selectedFormColumnName" :options="formColumnList" size="sm" v-on:change="changeColumnName"/>
        </b-col>
        <b-col cols="4">
          <b-form-input type="text" v-model="selectedFormColumnNameTag" size="sm" />
        </b-col>
      </b-row>
    </b-container>
    <b-btn class="mt-3" block @click="updateTransferTask">編集終了</b-btn>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'mail-transfer-edit',
  props: ['serverUri', 'transferTask', 'transferEditModalState', 'formCols'],
  data: function () {
    return {
      config: {},
      tmpTransferTask: {
        name: '',
        config: {}
      },
      transferConfig: {},
      selectedFormColumnName: '',
      selectedFormColumnNameTag: '',
      columnAttachList: []
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
    axios.get(this.$props.serverUri + 'transfer/config/Mail', this.$data.config)
    .then(response => {
      this.$set(this.$data, 'transferConfig', response.data.dataset)
      this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
    })
    .catch(function (error) {
      console.log(error.text)
      this.$router.push({path: '/signin'})
    })
  },
  methods: {
    updateTransferTask: function () {
      this.$refs.modalMailTransferRuleSetting.hide()
    },
    updateModalState: function () {
      this.$emit('transferEditModalClose', this.$data.tmpTransferTask.transfer_type_id)
    },
    changeColumnName: function () {
      this.$data.selectedFormColumnNameTag = '{%' + this.$data.selectedFormColumnName + '%}'
    }
  },
  watch: {
    transferEditModalState: function () {
      var modalState = this.$props.transferEditModalState[this.$data.transferConfig.id]
      if (modalState === 0 || typeof modalState === 'undefined') {
        this.$refs.modalMailTransferRuleSetting.hide()
      } else {
        this.$refs.modalMailTransferRuleSetting.show()
      }
    },
    transferTask: function () {
      this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
    }
  },
  computed: {
    formColumnList: function () {
      var formCols = []
      if (typeof this.$props.formCols === 'object') {
        for (var col in this.$props.formCols) {
          col = { value: this.$props.formCols[col].colId, text: this.$props.formCols[col].name }
          formCols.push(col)
        }
      }
      return formCols
    }
  }

}
</script>