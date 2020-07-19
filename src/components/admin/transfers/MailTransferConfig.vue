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
          {{ $t('message.end_edit') }}
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
      inEditIndex: 0
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
      this.modalClose()
    }
  }
}
</script>

<style scoped>
</style>
