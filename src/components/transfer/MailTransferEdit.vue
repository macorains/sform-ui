<template>
  <div class="mail-transfer-edit">
    <b-modal
      ref="modalMailTransferRuleSetting"
      size="lg"
      hide-footer
      title="MailTransfer設定"
      @hide="updateModalState"
    >
      <b-container class="text-left">
        <b-row class="mb-2">
          <b-col cols="3">
            転送タスク名
          </b-col>
          <b-col>
            <b-form-input
              id="transferTask.name"
              v-model="tmpTransferTask.name"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            メール件名
          </b-col>
          <b-col>
            <b-form-input
              id="transferTask.config.mailSubject"
              ref="mailSubject"
              v-model="tmpTransferTask.config.mailSubject"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            メール送信元
          </b-col>
          <b-col>
            <b-form-select
              id="transferTask.config.mailFrom"
              v-model="tmpTransferTask.config.mailFrom"
              :options="fromAddressList"
            />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            メール送信先
          </b-col>
          <b-col>
            <b-form-input
              id="transferTask.config.mailTo"
              ref="mailTo"
              v-model="tmpTransferTask.config.mailTo"
              type="text"
            />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3">
            メール本文
          </b-col>
          <b-col>
            <b-form-textarea
              id="transferTask.config.mailBody"
              ref="mailBody"
              v-model="tmpTransferTask.config.mailBody"
              :rows="10"
            />
          </b-col>
        </b-row>
        <b-row class="mb-2 pt-2 border-top">
          <b-col cols="3">
            タグ挿入
          </b-col>
          <b-col cols="5">
            <b-form-select
              v-model="selectedFormColumnName"
              :options="formColumnList"
              size="sm"
            />
          </b-col>
          <b-col cols="4">
            <b-form-input
              ref="selectedTag"
              v-model="selectedFormColumnNameTag"
              type="text"
              size="sm"
              readonly
            />
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="3" />
          <b-col cols="3">
            <b-btn
              size="sm"
              block
              @click="insertTag('mailSubject')"
            >
              <span
                class="oi oi-plus"
                title="plus"
                aria-hidden="true"
              />
              メール件名
            </b-btn>
          </b-col>
          <b-col cols="3">
            <b-btn
              size="sm"
              block
              @click="insertTag('mailTo')"
            >
              <span
                class="oi oi-plus"
                title="plus"
                aria-hidden="true"
              />
              メール送信先
            </b-btn>
          </b-col>
          <b-col cols="3">
            <b-btn
              size="sm"
              block
              @click="insertTag('mailBody')"
            >
              <span
                class="oi oi-plus"
                title="plus"
                aria-hidden="true"
              />
              本文
            </b-btn>
          </b-col>
        </b-row>
      </b-container>
      <b-btn
        class="mt-3"
        block
        @click="updateTransferTask"
      >
        編集終了
      </b-btn>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'MailTransferEdit',
  props: {
    'hashedFormId': {
      type: String,
      default: ''
    },
    'serverUri': {
      type: String,
      default: ''
    },
    'transferTask': {
      type: Object,
      default: () => ({})
    },
    'transferEditModalState': {
      type: Array,
      default: () => ([])
    },
    'formCols': {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      config: {},
      tmpTransferTask: {
        name: '',
        config: {}
      },
      defaultTransferTask: {
        config: {
          formId: this.$props.hashedFormId,
          mailSubject: '',
          mailFrom: '',
          mailTo: '',
          mailBody: ''
        },
        created: '',
        del_flg: 0,
        id: 0,
        modified: '',
        name: 'MailTransfer Task',
        status: 0,
        transfer_type_id: 2
      },
      transferConfig: {},
      selectedFormColumnName: '',
      columnAttachList: []
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
    },
    selectedFormColumnNameTag: function () {
      if (this.$data.selectedFormColumnName !== '') {
        return '{%' + this.$data.selectedFormColumnName + '%}'
      } else {
        return ''
      }
    },
    fromAddressList: function () {
      if (typeof (this.$data.transferConfig.addressList) === 'undefined') {
        return null
      } else {
        return this.$data.transferConfig.addressList.map(data => data.address)
      }
    }
  },
  watch: {
    transferEditModalState: function () {
      var modalState = this.$props.transferEditModalState[this.$data.transferConfig.id]
      if (modalState === 0 || typeof modalState === 'undefined') {
        this.$refs.modalMailTransferRuleSetting.hide()
      } else {
        if (!Object.keys(this.$props.transferTask).length) {
          this.$emit('setDefault', this.$data.defaultTransferTask)
        }
        this.$refs.modalMailTransferRuleSetting.show()
      }
    },
    transferTask: function () {
      this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        'timeout': 3000
      }
    }
    axios.get(this.$props.serverUri + '/transfer/config/Mail', this.$data.config)
      .then(response => {
        this.$set(this.$data, 'transferConfig', response.data.dataset)
        if (!Object.keys(this.$props.transferTask).length) {
          Object.assign(this.$props.transferTask, this.$data.defaultTransferTask)
        }
        this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
      })
      .catch(function (error) {
        console.error(error)
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
    insertTag: function (target) {
      var targetObj = this.$refs[target]
      console.log(targetObj)
      var cursorPosition = targetObj.selectionStart
      var textBefore = targetObj.value.substr(0, cursorPosition)
      var textAfter = targetObj.value.substr(cursorPosition, targetObj.length)
      this.$set(this.$data.tmpTransferTask.config, target, textBefore + this.$refs.selectedTag.value + textAfter)

      /*
      var mailBody = this.$refs.mailBody
      var cursorPosition = mailBody.selectionStart
      var textBefore = mailBody.value.substr(0, cursorPosition)
      var textAfter = mailBody.value.substr(cursorPosition, mailBody.length)
      this.$set(this.$data.tmpTransferTask.config, 'mailBody', textBefore + this.$refs.selectedTag.value + textAfter)
      */
      console.log(this)
      // this.$set(this.$data.tmpTransferTask.config, 'mailBody', textBefore + this.$computed.selectedFormColumnNameTag + textAfter)
      // alert(mailBody.selectionStart)
    }
  }
}
</script>
