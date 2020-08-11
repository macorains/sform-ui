<template>
  <b-modal
    id="modal_mail_transfer_task_edit"
    ref="modalMailTransferRuleSetting"
    size="lg"
    hide-footer
    :title="$t('message.mail_transfer_setting')"
    :visible="isVisible"
    @shown="modalInit"
  >
    <b-container>
      <b-row>
        <b-col cols="9">
          <b-container class="text-left">
            <b-row class="mb-2">
              <b-col cols="3">
                {{ $t('message.transfer_task_name') }}
              </b-col>
              <b-col cols="9">
                <b-form-input
                  id="transferTask.name"
                  v-model="transferTask.name"
                  type="text"
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="3">
                {{ $t('message.mail_subject') }}
              </b-col>
              <b-col cols="9">
                <b-form-input
                  id="transferTask.mail.subject"
                  ref="subject"
                  v-model="transferTask.mail.subject"
                  type="text"
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="3">
                {{ $t('message.mail_from') }}
              </b-col>
              <b-col cols="9">
                <b-form-select
                  id="transferTask.mail.from_address_id"
                  v-model="transferTask.mail.from_address_id"
                  :options="mailAddressList"
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="3">
                {{ $t('message.mail_to') }}
              </b-col>
              <b-col cols="9">
                <b-form-input
                  id="transferTask.mail.to_address"
                  ref="to_address"
                  v-model="transferTask.mail.to_address"
                  type="text"
                />
              </b-col>
            </b-row>
            <b-row
              v-if="transferConfig.detail.mail.use_cc"
              class="mb-2"
            >
              <b-col cols="3">
                {{ $t('message.mail_cc') }}
              </b-col>
              <b-col cols="9">
                <b-form-input
                  id="transferTask.mail.cc_address"
                  ref="cc_address"
                  v-model="transferTask.mail.cc_address"
                  type="text"
                />
              </b-col>
            </b-row>
            <b-row
              v-if="transferConfig.detail.mail.use_bcc"
              class="mb-2"
            >
              <b-col cols="3">
                {{ $t('message.mail_bcc') }}
              </b-col>
              <b-col cols="9">
                <b-form-select
                  id="transferTask.mail.bcc_address_id"
                  v-model="transferTask.mail.bcc_address_id"
                  :options="mailAddressList"
                />
              </b-col>
            </b-row>
            <b-row
              v-if="transferConfig.detail.mail.use_replyto"
              class="mb-2"
            >
              <b-col cols="3">
                {{ $t('message.mail_replyto') }}
              </b-col>
              <b-col cols="9">
                <b-form-select
                  id="transferTask.mail.replyto_address_id"
                  v-model="transferTask.mail.replyto_address_id"
                  :options="mailAddressList"
                />
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col cols="3">
                {{ $t('message.mail_body') }}
              </b-col>
              <b-col cols="9">
                <b-form-textarea
                  id="transferTask.mail.body"
                  ref="body"
                  v-model="transferTask.mail.body"
                  :rows="10"
                />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <b-col class="border-left">
          <h5>{{ $t('message.tags_of_form_column') }}</h5>
          <b-list-group
            v-for="item in formCols"
            id="form_col_tags"
            :key="item.col_index"
            class="mb-2"
          >
            <b-list-group-item
              :active="selectedTagIndex == item.col_index"
              class="tags"
              @click="selectTag(item.col_index)"
            >
              {{ item.name }}
            </b-list-group-item>
          </b-list-group>
          <b-button
            @click="insertTag('subject')"
          >
            {{ $t('message.mail_subject') }}
          </b-button>
          <b-button
            @click="insertTag('to_address')"
          >
            {{ $t('message.mail_to') }}
          </b-button>
          <b-button
            v-if="transferConfig.detail.mail.use_cc"
            @click="insertTag('cc_address')"
          >
            {{ $t('message.mail_cc') }}
          </b-button>
          <b-button
            @click="insertTag('body')"
          >
            {{ $t('message.mail_body') }}
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-btn
      class="mt-3"
      block
      @click="updateTransferTask"
    >
      {{ $t('message.end_edit') }}
    </b-btn>
  </b-modal>
</template>
<script>
export default {
  name: 'TransferTaskMailEdit',
  props: {
    serverUri: {
      type: String,
      default: ''
    },
    transferTask: {
      type: Object,
      default: () => ({})
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    formCols: {
      type: Array,
      default: () => ([])
    }
  },
  data: function () {
    return {
      config: {},
      transferConfig: {
        detail: {
          mail: {
            use_cc: false,
            use_bcc: false,
            use_replyto: false
          }
        }
      },
      selectedTagIndex: -1,
      mailAddressList: []
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
  },
  methods: {
    modalInit: function () {
      this.$http.get(this.$props.serverUri + '/transfer/config/' + this.$props.transferTask.transfer_config_id, this.$data.config)
        .then(response => {
          this.$data.transferConfig = response.data
          this.$data.mailAddressList = this.$data.transferConfig.detail.mail.mail_address_list.map(addr => ({ value: addr.id, text: addr.name + '(' + addr.address + ')' }))
        })
    },
    updateTransferTask: function () {
      this.$data.selectedTagIndex = -1
      this.$refs.modalMailTransferRuleSetting.hide()
      this.$emit('transferTaskEditModalClose', 'Mail')
    },
    insertTag: function (target) {
      var targetObj = this.$refs[target]
      var cursorPosition = targetObj.selectionStart
      var textBefore = targetObj.value.substr(0, cursorPosition)
      var textAfter = targetObj.value.substr(cursorPosition, targetObj.length)
      this.$set(this.$props.transferTask.mail, target, textBefore + '{%' + this.$props.formCols[this.$data.selectedTagIndex].col_id + '%}' + textAfter)
    },
    selectTag: function (index) {
      this.$data.selectedTagIndex = index
    }
  }
}
</script>
<style>
#modal_mail_transfer_task_edit > div {
  max-width: 70%;
}
#form_col_tags > div {
  padding:0.5rem 1.25rem
}
</style>
