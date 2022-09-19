<template>
  <div v-if="transferTask.mail">
    <b-modal
      id="modal_mail_transfer_task_edit"
      ref="modalMailTransferRuleSetting"
      size="lg"
      hide-footer
      :title="$t('message.mail_transfer_setting')"
      :visible="isVisible"
      @shown="modalInit"
      @hide="cancel"
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
                  <b-form-radio-group
                    id="mail_to_type_group"
                    v-model="transferTask.mail.to_address_type"
                    name="mail_to_type_component"
                  >
                    <b-form-radio value="to_mail_address">
                      メールアドレス指定
                    </b-form-radio>
                    <b-form-radio value="to_mail_address_id">
                      登録済みメールアドレス選択
                    </b-form-radio>
                    <b-form-radio value="to_mail_address_field">
                      フォームフィールド選択
                    </b-form-radio>
                  </b-form-radio-group>
                  <b-form-input
                    v-if="transferTask.mail.to_address_type === 'to_mail_address'"
                    id="transferTask.mail.to_address"
                    ref="to_address"
                    v-model="transferTask.mail.to_address"
                    type="text"
                  />
                  <b-form-select
                    v-if="transferTask.mail.to_address_type === 'to_mail_address_id'"
                    id="transferTask.mail.to_address_id"
                    v-model="transferTask.mail.to_address_id"
                    :options="mailAddressList"
                  />
                  <b-form-input
                    v-if="transferTask.mail.to_address_type === 'to_mail_address_field'"
                    id="transferTask.mail.to_address_field"
                    ref="to_address"
                    v-model="transferTask.mail.to_address_field"
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
                  <b-form-radio-group
                    id="mail_cc_type_group"
                    v-model="transferTask.mail.cc_address_type"
                    name="mail_cc_type_component"
                  >
                    <b-form-radio value="cc_mail_address">
                      メールアドレス指定
                    </b-form-radio>
                    <b-form-radio value="cc_mail_address_id">
                      登録済みメールアドレス選択
                    </b-form-radio>
                    <b-form-radio value="cc_mail_address_field">
                      フォームフィールド選択
                    </b-form-radio>
                  </b-form-radio-group>
                  <b-form-input
                    v-if="transferTask.mail.cc_address_type === 'cc_mail_address'"
                    id="transferTask.mail.cc_address"
                    ref="cc_address"
                    v-model="transferTask.mail.cc_address"
                    type="text"
                  />
                  <b-form-input
                    v-if="transferTask.mail.cc_address_type === 'cc_mail_address_id'"
                    id="transferTask.mail.cc_address_id"
                    ref="cc_address_id"
                    v-model="transferTask.mail.cc_address_id"
                    type="text"
                  />
                  <b-form-input
                    v-if="transferTask.mail.cc_address_type === 'cc_mail_address_field'"
                    id="transferTask.mail.cc_address_field"
                    ref="cc_address_field"
                    v-model="transferTask.mail.cc_address_field"
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
  </div>
</template>
<script>
export default {
  name: 'TransferTaskMailEdit',
  props: {
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
  methods: {
    modalInit: function () {
      this.$http.get('/transfer/config/' + this.$props.transferTask.transfer_config_id)
        .then(response => {
          this.$data.transferConfig = response.data
          this.$data.mailAddressList = this.$data.transferConfig.detail.mail.mail_address_list.map(addr => ({ value: addr.id, text: addr.name + '(' + addr.address + ')' }))
          this.setAddressType()
        })
    },
    updateTransferTask: function () {
      this.$data.selectedTagIndex = -1
      this.$refs.modalMailTransferRuleSetting.hide()
      this.$emit('transferTaskEditModalClose', 'mail')
    },
    cancel: function () {
      // TODO とりあえずupdateと同じにしてあるが、キャンセル時にデータを戻すよう後で改良する
      this.$data.selectedTagIndex = -1
      this.$refs.modalMailTransferRuleSetting.hide()
      this.$emit('transferTaskEditModalClose', 'mail')
    },
    insertTag: function (target) {
      const targetObj = this.$refs[target]
      const cursorPosition = targetObj.selectionStart
      const textBefore = targetObj.value.substr(0, cursorPosition)
      const textAfter = targetObj.value.substr(cursorPosition, targetObj.length)
      this.$set(this.$props.transferTask.mail, target, textBefore + '{%' + this.$props.formCols[this.$data.selectedTagIndex].col_id + '%}' + textAfter)
    },
    selectTag: function (index) {
      this.$data.selectedTagIndex = index
    },
    setAddressType: function () {
      const ttm = this.$props.transferTask.mail
      if (ttm.to_address != null && !ttm.to_address.isEmpty) {
        this.$set(ttm, 'to_address_type', 'to_mail_address')
      }
      if (ttm.to_address_id != null && !ttm.to_address_id.isEmpty) {
        this.$set(ttm, 'to_address_type', 'to_mail_address_id')
      }
      if (ttm.to_address_field != null && !ttm.to_address_field.isEmpty) {
        this.$set(ttm, 'to_address_type', 'to_mail_address_field')
      }

      if (ttm.cc_address != null && !ttm.cc_address.isEmpty) {
        this.$set(ttm, 'cc_address_type', 'cc_mail_address')
      }
      if (ttm.cc_address_id != null && !ttm.cc_address_id.isEmpty) {
        this.$set(ttm, 'cc_address_type', 'cc_mail_address_id')
      }
      if (ttm.cc_address_field != null && !ttm.cc_address_field.isEmpty) {
        this.$set(ttm, 'cc_address_type', 'cc_mail_address_field')
      }
      if (ttm.cc_address_type == null) {
        this.$set(ttm, 'cc_address_type', 'cc_mail_address')
      }
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
