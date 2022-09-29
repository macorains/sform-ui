<template>
  <div
    v-if="transferTask.salesforce"
    class="salesforce-transfer-edit"
  >
    <b-modal
      ref="modalSalesforceTransferRuleSetting"
      size="lg"
      hide-footer
      title="SalesforceTransfer設定"
      :visible="isVisible"
      @hide="modalClose"
      @shown="modalInit"
    >
      <b-container class="text-left">
        <b-row class="mb-3">
          <b-col cols="3">
            転送タスク名
          </b-col>
          <b-col>
            <b-form-input
              id="transferTask.name"
              v-model="transferTask.name"
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
              v-model="transferTask.salesforce.object_name"
              :options="object_list"
              class="mb-3"
              @change="updateFieldList"
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
                  v-for="(item, index) in field_list"
                  :key="index"
                >
                  <td>{{ item.label }}</td>
                  <td>{{ item.field_type }}</td>
                  <td>
                    <b-form-select
                      v-model="item.column_id"
                      :options="column_list"
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
  name: 'TransferTaskSalesforceEdit',
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
      selectedSalesforceObject: '',
      transferConfig: {},
      object_list: [],
      field_list: [],
      column_list: []
    }
  },
  methods: {
    modalInit: function () {
      this.$data.field_list = []
      axios.get('/transfer/config/' + this.$props.transferTask.transfer_config_id)
        .then(response => {
          this.$data.transferConfig = response.data
          this.$data.object_list = this.$data.transferConfig.detail.salesforce.objects.filter(o => o.active).map(o => ({ value: o.name, text: o.label }))
          this.$data.column_list = this.$props.formCols.map(c => ({ value: c.col_id, text: c.name }))
          if (this.$props.transferTask.salesforce.object_name !== null) {
            this.updateFieldList()
          }
          this.$data.field_list.forEach((c, i) => {
            const index = this.$props.transferTask.salesforce.fields.findIndex(f => f.field_name === c.name)
            if (index >= 0) {
              this.$data.field_list[i].column_id = this.$props.transferTask.salesforce.fields[index].form_column_id
            }
          })
        })
    },
    modalClose: function () {
      this.$emit('transferTaskEditModalClose', 'salesforce')
    },
    updateFieldList: function () {
      this.$data.field_list = this.$data.transferConfig.detail.salesforce.objects.filter(o => o.name === this.$props.transferTask.salesforce.object_name).flatMap(o => o.fields).filter(f => f.active)
    },
    updateTransferTask: function () {
      this.$data.field_list.forEach(c => {
        if ('column_id' in c) {
          const index = this.$props.transferTask.salesforce.fields.findIndex(f => f.field_name === c.name)
          if (index >= 0) {
            this.$props.transferTask.salesforce.fields[index].form_column_id = c.column_id
          } else {
            const field = {
              id: null,
              form_transfer_task_salesforce_id: this.$props.transferTask.salesforce.id,
              form_column_id: c.column_id,
              field_name: c.name
            }
            const length = this.$props.transferTask.salesforce.fields.length
            this.$set(this.$props.transferTask.salesforce.fields, length, field)
          }
        }
      })
      this.modalClose()
    }
  }
}
</script>
