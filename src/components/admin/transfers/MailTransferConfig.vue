<template>
  <b-modal
    id="modal_mail_transfer_config_edit"
    ref="modalMailTransferConfigEdit"
    :title="$t('message.mail_transfer_setting')"
    size="lg"
    :hide-header-close="true"
    :visible="isVisible"
    @close="modalClose()"
    @hide="modalClose()"
    @show="modalInit()"
  >
    <b-container class="text-left">
      <b-form-row>
        <b-col>
          <b-form-checkbox
            id="use_cc"
            v-model="transferConfig.detail.mail.use_cc"
            name="use_cc"
          >
            {{ $t('message.use_cc') }}
          </b-form-checkbox>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-checkbox
            id="use_bcc"
            v-model="transferConfig.detail.mail.use_bcc"
            name="use_bcc"
          >
            {{ $t('message.use_bcc') }}
          </b-form-checkbox>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-checkbox
            id="use_replyto"
            v-model="transferConfig.detail.mail.use_replyto"
            name="use_replyto"
          >
            {{ $t('message.use_replyto') }}
          </b-form-checkbox>
        </b-col>
      </b-form-row>
      <h5 class="mt-3">
        メールアドレス
      </h5>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              No.
            </th>
            <th scope="col">
              {{ $t('message.name') }}
            </th>
            <th scope="col">
              {{ $t('message.mail_address') }}
            </th>
            <th scope="col">
              {{ $t('message.action') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in transferConfig.detail.mail.mail_address_list"
            :key="item.address_index"
          >
            <th scope="row">
              {{ Number(item.address_index) + 1 }}
            </th>
            <td>
              <span v-show="!inEdit || ( inEdit && item.address_index != inEditIndex )">
                {{ item.name }}
              </span>
              <b-form-input
                v-show="inEdit && item.address_index == inEditIndex"
                v-model="item.name"
                type="text"
              />
            </td>
            <td>
              <span v-show="!inEdit || ( inEdit && item.address_index != inEditIndex )">
                {{ item.address }}
              </span>
              <b-form-input
                v-show="inEdit && item.address_index == inEditIndex"
                v-model="item.address"
                type="text"
              />
            </td>
            <td>
              <b-btn
                v-show="!inEdit"
                size="sm"
                @click="edit(item.address_index)"
              >
                <span
                  class="oi oi-pencil"
                  title="pencil"
                  aria-hidden="true"
                />
                {{ $t('message.edit') }}
              </b-btn>
              <b-btn
                v-show="!inEdit"
                size="sm"
                @click="del(item.address_index)"
              >
                <span
                  class="oi oi-x"
                  title="x"
                  aria-hidden="true"
                />
                {{ $t('message.delete') }}
              </b-btn>
              <b-btn
                v-show="inEdit && item.address_index == inEditIndex"
                size="sm"
                @click="endEdit(item.address_index)"
              >
                <span
                  class="oi oi-check"
                  title="check"
                  aria-hidden="true"
                />
                {{ $t('message.end_edit') }}
              </b-btn>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>
              <b-form-input
                v-model="newName"
                type="text"
              />
            </td>
            <td>
              <b-form-input
                v-model="newAddress"
                type="email"
              />
            </td>
            <td>
              <b-btn
                v-show="!inEdit"
                size="sm"
                @click="add"
              >
                <span
                  class="oi oi-plus"
                  title="plus"
                  aria-hidden="true"
                />
                {{ $t('message.add') }}
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
    <div
      slot="modal-footer"
      class="w-100 text-right"
    >
      <b-col>
        <b-btn
          class="mt-3"
          variant="danger"
          @click="modalClose()"
        >
          <span
            class="oi oi-x"
            title="x"
            aria-hidden="true"
          />
          {{ $t('message.cancel') }}
        </b-btn>
        <b-btn
          class="mt-3"
          variant="primary"
          @click="save"
        >
          <span
            class="oi oi-check"
            title="check"
            aria-hidden="true"
          />
          {{ $t('message.save_change') }}
        </b-btn>
      </b-col>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'MailTransferConfig',
  props: {
    serverUri: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    transferConfigId: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      transferConfig: {
        detail: {
          mail: {}
        }
      },
      inEdit: false,
      inEditIndex: 0,
      newName: '',
      newAddress: ''
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
      this.$http.get(this.$props.serverUri + '/transfer/config/' + this.$props.transferConfigId, this.$data.config)
        .then(response => {
          this.$data.transferConfig = response.data
        })
    },
    modalClose: function () {
      this.$data.newName = null
      this.$data.newAddress = null
      this.$emit('changeModalState', 'mail', false)
    },
    edit: function (index) {
      this.$data.inEdit = true
      this.$data.inEditIndex = index
    },
    endEdit: function () {
      this.$data.inEdit = false
    },
    save: function () {
      this.$http.post(this.$props.serverUri + '/transfer/config', this.$data.transferConfig, this.$data.config)
        .then(response => {
          this.modalClose()
        })
    },
    add: function () {
      const addressList = this.$data.transferConfig.detail.mail.mail_address_list
      const listLength = addressList.length
      addressList.push({ address_index: listLength, name: this.$data.newName, address: this.$data.newAddress, id: null, transfer_config_mail_id: this.$data.transferConfig.detail.mail.id })
      this.$data.newName = null
      this.$data.newAddress = null
    },
    del: function (index) {
      const addressList = this.$data.transferConfig.detail.mail.mail_address_list
      this.$delete(addressList, index)
      for (var i = 0; i < addressList.length; i++) {
        addressList[i].address_index = i
      }
    }
  }
}
</script>

<style scoped>
</style>
