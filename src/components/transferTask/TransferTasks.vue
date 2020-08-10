<template>
  <div class="transfers">
    <h3>{{ $t('message.transfer_task') }}</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">
            {{ $t('message.no') }}
          </th>
          <th scope="col">
            {{ $t('message.transfer_task_name') }}
          </th>
          <th scope="col">
            {{ $t('message.transfer_config_name') }}
          </th>
          <th scope="col">
            {{ $t('message.action') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in formData.form_transfer_tasks"
          :key="task.id"
        >
          <th scope="row">
            {{ index+1 }}
          </th>
          <td>{{ task.name }}</td>
          <td>{{ transferType(index) }}</td>
          <td>
            <b-btn
              size="sm"
              @click="edit(index, transferType(index))"
            >
              <span
                class="oi oi-pencil"
                title="pencil"
                aria-hidden="true"
              />
              {{ $t('message.edit') }}
            </b-btn>
            <b-btn
              size="sm"
              @click="transferTaskDeleteModalOpen(index)"
            >
              <span
                class="oi oi-trash"
                title="trash"
                aria-hidden="true"
              />
              {{ $t('message.delete') }}
            </b-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <b-container class="text-right">
      <b-row class="alert alert-info">
        <b-col
          cols="7"
          class="text-left"
        >
          {{ $t('message.add_transfer_task') }}
        </b-col>
        <b-col
          cols="3"
          class="text-right"
        >
          <b-form-select
            v-model="selectedTransferConfigId"
            :options="optionTransferType"
            class="mb-3"
          />
        </b-col>
        <b-col cols="2">
          <b-btn
            block
            size="sm"
            @click="newEdit(selectedTransferConfigId)"
          >
            <span
              class="oi oi-plus"
              title="plus"
              aria-hidden="true"
            />
            {{ $t('message.add') }}
          </b-btn>
        </b-col>
      </b-row>
    </b-container>
    <transferTaskSalesforceEdit
      ref="TransferTaskSalesforceEdit"
      :server-uri="serverUri"
      :is-visible="transferEditModalState.Salesforce"
      :transfer-task="formData.form_transfer_tasks[selectedTransferTask]"
      :form-cols="formData.form_cols"
      @transferTaskEditModalClose="transferTaskEditModalClose"
    />
    <transferTaskMailEdit
      ref="transferTaskMailEdit"
      :server-uri="serverUri"
      :is-visible="transferEditModalState.Mail"
      :transfer-task="formData.form_transfer_tasks[selectedTransferTask]"
      :form-cols="formData.form_cols"
      @transferTaskEditModalClose="transferTaskEditModalClose"
    />
    <transferTaskDeleteModal
      ref="transferTaskDeleteModal"
      :index="selectedTransferTask"
      :is-visible="transferTaskDeleteModalState"
      @transferTaskDeleteModalClose="transferTaskDeleteModalClose"
      @transferTaskDelete="transferTaskDelete"
    />
  </div>
</template>
<script>
import axios from 'axios'
import TransferTaskSalesforceEdit from './TransferTaskSalesforceEdit.vue'
import TransferTaskMailEdit from './TransferTaskMailEdit.vue'
import TransferTaskDeleteModal from './TransferTaskDeleteModal.vue'

export default {
  name: 'Transfers',
  components: {
    transferTaskSalesforceEdit: TransferTaskSalesforceEdit,
    transferTaskMailEdit: TransferTaskMailEdit,
    transferTaskDeleteModal: TransferTaskDeleteModal
  },
  props: {
    serverUri: {
      type: String,
      default: ''
    },
    hashedFormId: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      defaultTransferTask: {
        Mail: {
          form_id: this.$props.formData.id,
          form_transfer_task_conditions: [],
          id: null,
          mail: {
            bcc_address_id: null,
            body: '',
            cc_address: '',
            form_transfer_task_id: null,
            from_address_id: null,
            id: null,
            replyto_address_id: null,
            subject: '',
            to_address: ''
          },
          name: '',
          salesforce: null,
          task_index: null,
          transfer_config_id: null
        },
        Salesforce: {
          form_id: this.$props.formData.id,
          form_transfer_task_conditions: [],
          id: null,
          mail: null,
          name: '',
          salesforce: {
            form_transfer_task_id: null,
            object_name: null,
            fields: []
          },
          task_index: null,
          transfer_config_id: null
        }
      },
      transferList: [],
      transferEditModalState: {
        Mail: false,
        Salesforce: false
      },
      transferTaskDeleteModalState: false,
      selectedTransferTask: 0,
      selectedTransferConfigId: 0,
      optionTransferType: []
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
    if (this.$props.hashedFormId) {
      axios.get(this.$props.serverUri + '/transfer/config/selectlist', this.$data.config)
        .then(response => {
          this.$data.transferList = response.data
          this.$data.optionTransferType = this.$data.transferList.map(tr => ({ value: tr.id, text: tr.name }))
        })
    }
  },
  methods: {
    getDefaultTransferTask: function (transferType) {
      var transferTask = this.$data.defaultTransferTask[transferType]
      transferTask.form_id = this.$props.formData.id
      transferTask.transfer_config_id = this.$data.selectedTransferConfigId
      transferTask.task_index = this.$props.formData.form_transfer_tasks.length + 1
      transferTask.name = 'Task' + transferTask.task_index
      return transferTask
    },
    edit: function (index, task) {
      this.selectedTransferTask = index
      this.$data.transferEditModalState[task] = true
    },
    newEdit: function (transferConfigId) {
      const transferType = this.$data.transferList.filter(t => t.id === transferConfigId).map(t => t.type_code).shift()
      var len = this.$props.formData.form_transfer_tasks.length
      this.$set(this.$props.formData.form_transfer_tasks, len, this.getDefaultTransferTask(transferType))
      this.edit(len, transferType)
    },
    transferType: function (index) {
      return this.$data.transferList.map(t => {
        return this.$props.formData.form_transfer_tasks[index][t.type_code.toLowerCase()] === null ? '' : t.type_code
      }).filter(t => t !== '').shift()
    },
    transferTaskEditModalClose: function (type) {
      this.$data.transferEditModalState[type] = false
    },
    transferTaskEditModalOpen: function () {
      this.$data.transferEditModalState[this.$data.selectedTransferType] = true
    },
    transferTaskDeleteModalOpen: function (index) {
      this.selectedTransferTask = index
      this.$data.transferTaskDeleteModalState = true
    },
    transferTaskDeleteModalClose: function () {
      this.$data.transferTaskDeleteModalState = false
    },
    transferTaskDelete: function (index) {
      this.$delete(this.$props.formData.form_transfer_tasks, index)
    }
  }
}
</script>
