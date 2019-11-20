<template>
  <div class="salesforce-transfer-edit">
    <b-modal
      ref="modalSalesforceTransferRuleSetting"
      size="lg"
      hide-footer
      title="SalesforceTransfer設定"
      @show="updateColumnAttachList"
      @hide="updateModalState"
    >
      <b-container class="text-left">
        <b-row class="mb-3">
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
        <b-row class="mb-3">
          <b-col cols="3">
            転送先Salesforce
            <br>
            オブジェクト
          </b-col>
          <b-col>
            <b-form-select
              v-model="selectedSalesforceObject"
              :options="salesforceObjectList"
              class="mb-3"
            />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="3">
            項目割付
          </b-col>
          <b-col id="attach_list">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">
                    Salesforce項目
                  </th>
                  <th scope="col">
                    型
                  </th>
                  <th scope="col">
                    フォーム項目
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in columnAttachList"
                  :key="index"
                >
                  <td>{{ item.salesforceObjectColumnLabel }}</td>
                  <td>{{ item.salesforceObjectColumnType }}</td>
                  <td>
                    <b-form-select
                      v-model="item.formColumnName"
                      :options="formColumnList"
                      size="sm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
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
<style>
#attach_list {
  overflow-y: initial !important
}
#attach_list table {
  display: block;
  height: calc(100vh - 360px);
  overflow-y:auto;
}
</style>
<script>
import axios from 'axios'

export default {
  name: 'SalesforceTransferEdit',
  props: {
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
          sfObject: '',
          columnConvertDefinition: {}
        },
        created: '',
        del_flg: 0,
        id: null,
        modified: '',
        name: 'SalesforceTask',
        status: 0,
        transfer_type_id: 1
      },
      selectedSalesforceObject: '',
      transferConfig: {},
      salesforceObjectList: [],
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
    }
  },
  watch: {
    transferEditModalState: function () {
      var modalState = this.$props.transferEditModalState[this.$data.transferConfig.id]
      if (modalState === 0 || typeof modalState === 'undefined') {
        this.$refs.modalSalesforceTransferRuleSetting.hide()
      } else {
        if (!Object.keys(this.$props.transferTask).length) {
          this.$emit('setDefault', this.$data.defaultTransferTask)
        }
        this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
        this.$refs.modalSalesforceTransferRuleSetting.show()
      }
    },
    transferTask: function () {
      this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
      this.$set(this.$data, 'selectedSalesforceObject', this.$props.transferTask.config.sfObject)
    },
    selectedSalesforceObject: function () {
      this.updateColumnAttachList()
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
        this.$set(this.$data, 'transferConfig', response.data.dataset)
        var salesforceObjectList = this.$data.transferConfig.sfObjectDefinition
          .filter(m => m.createable)
          .filter(m => m.searchLayoutable)
          .map(m => { return { value: m.name, text: m.label } })
        this.$set(this.$data, 'salesforceObjectList', salesforceObjectList)
        this.$set(this.$data, 'tmpTransferTask', this.$props.transferTask)
      })
      .catch(function (error) {
        console.error(error.text)
        this.$router.push({path: '/signin'})
      })
  },
  methods: {
    updateColumnAttachList: function () {
      this.$data.tmpTransferTask.config.sfObject = this.$data.selectedSalesforceObject
      var columnAttachList = []
      if (typeof this.$data.transferConfig.sfObjectDefinition === 'object') {
        var salesforceObjectDef = this.$data.transferConfig.sfObjectDefinition
          .filter(m => m.name === this.$data.selectedSalesforceObject)
          .shift()
        if (salesforceObjectDef !== undefined && salesforceObjectDef.fields !== undefined && typeof salesforceObjectDef.fields === 'object') {
          columnAttachList = salesforceObjectDef.fields
            .filter(field => field.updateable)
            .filter(field => field.type !== 'reference')
            .map(field => {
              var formColumnName = ''
              for (let def of this.$props.transferTask.config.columnConvertDefinition) {
                if (def.sfCol === field.name) {
                  formColumnName = def.sformCol
                }
              }
              return {
                salesforceObjectColumnLabel: field.label,
                salesforceObjectColumnName: field.name,
                salesforceObjectColumnType: field.type,
                formColumnLabel: '',
                formColumnName: formColumnName
              }
            })
        }
      }
      this.$set(this.$data, 'columnAttachList', columnAttachList)
    },
    updateTransferTask: function () {
      this.$data.tmpTransferTask.config.columnConvertDefinition =
          this.$data.columnAttachList
            .filter(def => def.salesforceObjectColumnName !== '' && def.formColumnName !== '')
            .map(def => { return {sfCol: def.salesforceObjectColumnName, sformCol: def.formColumnName} })
      this.$refs.modalSalesforceTransferRuleSetting.hide()
    },
    updateModalState: function () {
      this.$emit('transferEditModalClose', this.$data.tmpTransferTask.transfer_type_id)
    }
  }
}
</script>
