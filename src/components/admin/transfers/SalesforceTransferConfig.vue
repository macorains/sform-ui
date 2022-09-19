<template>
  <b-modal
    id="modal_salesforce_transfer_config_edit"
    ref="modalSalesforceTransferConfigEdit"
    :title="$t('message.salesforce_transfer_setting')"
    size="lg"
    :hide-header-close="true"
    :hide-footer="true"
    :visible="isVisible"
    @shown="modalInit"
    @hide="endEdit"
  >
    <b-container class="text-left">
      <b-row>
        <b-col cols="4">
          <b-form-row>
            <b-col>
              <b-form-group
                id="userGroup"
                label-for="user"
                :label="$t('message.username')"
              >
                <b-form-input
                  id="user"
                  v-model="transferConfig.detail.salesforce.sf_user_name"
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
                  v-model="transferConfig.detail.salesforce.sf_password"
                  type="password"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="salesforceClientIdGroup"
                label-for="salesforce_client_id"
                :label="$t('message.salesforce_client_id')"
              >
                <b-form-input
                  id="salesforce_client_id"
                  v-model="transferConfig.detail.salesforce.sf_client_id"
                  type="text"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="salesforceClientSecretGroup"
                label-for="salesforce_client_secret"
                :label="$t('message.salesforce_client_secret')"
              >
                <b-form-input
                  id="salesforce_client_secret"
                  v-model="transferConfig.detail.salesforce.sf_client_secret"
                  type="text"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="salesforceDomainGroup"
                label-for="salesforce_domain"
                :label="$t('message.salesforce_domain')"
              >
                <b-form-input
                  id="salesforce_domain"
                  v-model="transferConfig.detail.salesforce.sf_domain"
                  type="text"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="salesforceApiVersionGroup"
                label-for="salesforce_api_version"
                :label="$t('message.salesforce_api_version')"
              >
                <b-form-input
                  id="salesforce_api_version"
                  v-model="transferConfig.detail.salesforce.api_version"
                  type="text"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="mt-5 text-right">
            <b-col>
              <b-btn @click="check">
                <span
                  class="oi oi-check"
                  title="check"
                  aria-hidden="true"
                />
                {{ $t('message.connection_check') }}
              </b-btn>
            </b-col>
          </b-form-row>
        </b-col>
        <b-col cols="4">
          <b class="mr-2">オブジェクト</b>
          <b-btn
            size="sm"
            @click="importObject"
          >
            <span
              class="oi oi-cloud-download"
              title="check"
              aria-hidden="true"
            />
            {{ $t('message.import_object') }}
          </b-btn>
          <table class="table mt-1 scroll-table">
            <thead>
              <tr>
                <th>有効</th>
                <th>オブジェクト名</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in transferConfig.detail.salesforce.objects"
                :key="item.id"
              >
                <td>
                  <b-checkbox
                    v-model="item.active"
                  />
                </td>
                <td @click="selectObject(item)">
                  {{ item.label }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="4">
          <span v-if="Object.keys(selectedObject).length">
            <b class="mr-2">{{ selectedObject.label }}のフィールド</b>
            <b-btn
              size="sm"
              @click="importField(selectedObject.name)"
            >
              <span
                class="oi oi-cloud-download"
                title="check"
                aria-hidden="true"
              />
              {{ $t('message.import_field') }}
            </b-btn>
            <table
              class="table mt-1 scroll-table"
            >
              <thead>
                <tr>
                  <th>有効</th>
                  <th>  フィールド名</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in selectedObject.fields"
                  :key="item.id"
                >
                  <td>
                    <b-checkbox
                      v-model="item.active"
                    />
                  </td>
                  <td>
                    {{ item.label }}
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <b-col class="text-right">
          <b-btn @click="endEdit">
            <span
              class="oi oi-x"
              title="cancel"
              aria-hidden="true"
            />
            {{ $t('message.cancel') }}
          </b-btn>
          <b-btn @click="save">
            <span
              class="oi oi-plus"
              title="plus"
              aria-hidden="true"
            />
            {{ $t('message.save_change') }}
          </b-btn>
        </b-col>
      </b-row>
    </b-container>
    <b-spinner
      v-show="inCheckWaiting"
      variant="primary"
    />
    <b-toast
      id="checkResult"
      title="Salesforce"
      toaster="b-toaster-bottom-right"
      static
      no-auto-hide
    >
      {{ checkResult.message }}
    </b-toast>
  </b-modal>
</template>

<script>
export default {
  name: 'SalesforceTransferConfig',
  props: {
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
      tmpTransferConfig: {},
      transferConfig: {
        detail: {
          salesforce: {}
        }
      },
      checkResult: {},
      inCheckWaiting: false,
      selectedObject: {}
    }
  },
  methods: {
    modalInit: function () {
      this.$http.get('/transfer/config/' + this.$props.transferConfigId)
        .then(response => {
          this.$data.transferConfig = response.data
        })
    },
    endEdit: function () {
      this.$data.selectedObject = {}
      this.$emit('changeModalState', 'salesforce', false)
    },
    save: function () {
      this.$http.post('/transfer/config', this.$data.transferConfig)
        .then(response => {
          console.log(response)
        })
      this.endEdit()
    },
    check: function () {
      const requestData = {
        username: this.$data.transferConfig.detail.salesforce.sf_user_name,
        password: this.$data.transferConfig.detail.salesforce.sf_password,
        client_id: this.$data.transferConfig.detail.salesforce.sf_client_id,
        client_secret: this.$data.transferConfig.detail.salesforce.sf_client_secret,
        api_version: this.$data.transferConfig.detail.salesforce.api_version,
        domain: this.$data.transferConfig.detail.salesforce.sf_domain
      }
      this.$bvToast.hide('checkResult')
      this.$data.inCheckWaiting = true
      this.$http.post('/transfer/salesforce/check', requestData)
        .then(response => {
          this.$data.inCheckWaiting = false
          this.$data.checkResult = response.data
          this.$bvToast.show('checkResult')
          console.log(response)
        })
    },
    selectObject: function (obj) {
      this.$data.selectedObject = obj
    },
    importObject: function () {
      this.$http.get('/transfer/salesforce/object/' + this.$props.transferConfigId)
        .then(response => {
          response.data.forEach(obj => this.appendObject(obj))
        })
    },
    importField: function (objName) {
      this.$http.get('/transfer/salesforce/field/' + this.$props.transferConfigId + '/' + objName)
        .then(response => {
          response.data.forEach(field => this.appendField(objName, field))
        })
    },
    appendObject: function (obj) {
      const targetObj = this.$data.transferConfig.detail.salesforce.objects
      if (targetObj.map(o => o.name).indexOf(obj.name)) {
        const newObj = {
          active: false,
          fields: [],
          id: null,
          label: obj.label,
          name: obj.name,
          transfer_config_salesforce_id: this.$data.transferConfig.detail.salesforce.id
        }
        this.$set(targetObj, targetObj.length, newObj)
      }
    },
    appendField: function (objName, field) {
      const targetObj = this.$data.transferConfig.detail.salesforce.objects.filter(o => o.name === objName)[0]
      if (targetObj.fields.map(f => f.name).indexOf(field.name)) {
        const newField = {
          active: false,
          id: null,
          label: field.label,
          name: field.name,
          field_type: field.field_type,
          transfer_config_salesforce_object_id: targetObj.id
        }
        this.$set(targetObj.fields, targetObj.fields.length, newField)
      }
    }
  }
}
</script>

<style>
#modal_salesforce_transfer_config_edit > div {
  max-width: 80%;
}

.scroll-table > thead, .scroll-table > tbody {
  display:block;
}
.scroll-table > tbody {
  max-height: 70vh;
  overflow-y: scroll;
}

</style>
