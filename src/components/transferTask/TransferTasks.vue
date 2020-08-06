<template>
  <div class="transfers">
    <h3>転送タスク</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">
            No.
          </th>
          <th scope="col">
            転送名
          </th>
          <th scope="col">
            転送設定
          </th>
          <th scope="col">
            操作
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
          <td>{{ transferType(task.transfer_type_id) }}</td>
          <td>
            <b-btn
              size="sm"
              @click="edit(index, transferType(task.transfer_type_id))"
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
              @click="transferDeleteModalOpen(index)"
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
    <!--
    <salesforceTransferEdit
      ref="salesforceTransferEdit"
      :hashed-form-id="hashedFormId"
      :server-uri="serverUri"
      :transfer-edit-modal-state="transferEditModalState"
      :transfer-task="transferTask[selectedTransferTask]"
      :form-cols="formCols"
      @transferEditModalClose="transferEditModalClose"
    />
    -->
    <transferTaskMailEdit
      ref="transferTaskMailEdit"
      :form-id="formData.id"
      :server-uri="serverUri"
      :is-visible="transferEditModalState.Mail"
      :transfer-task="formData.form_transfer_tasks[selectedTransferTask]"
      :form-cols="formData.form_cols"
      @transferEditModalClose="transferEditModalClose"
    />
    <transferTaskDeleteModal
      ref="transferTaskDeleteModal"
      :index="selectedTransferTask"
      :transfer-task-delete-modal-state="transferTaskDeleteModalState"
      @transferDeleteModalClose="transferDeleteModalClose"
      @transferDelete="transferDelete"
    />
  </div>
</template>
<script>
import axios from 'axios'
// import SalesforceTransferEdit from './SalesforceTransferEdit.vue'
import TransferTaskMailEdit from './TransferTaskMailEdit.vue'
import TransferTaskDeleteModal from './TransferTaskDeleteModal.vue'

export default {
  name: 'Transfers',
  components: {
    // salesforceTransferEdit: SalesforceTransferEdit,
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
          form_transfer_task_condition: [],
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
          id: ''
        }
      },
      transferList: [],
      transferEditModalState: {
        Mail: false,
        Salesforce: false
      },
      transferTaskDeleteModalState: 0,
      selectedTransferTask: 0,
      selectedTransferConfigId: 0,
      optionTransferType: []
    }
  },
  computed: {
    filteredTransferTaskList: function () {
      return this.$data.transferTask.filter(task => task.del_flg === 0)
    }
  },
  watch: {
    transferTask: function () {
      this.$emit('updateTransferTask', this.$data.transferTask)
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
      transferTask.transfer_config_id = this.$data.selectedTransferConfigId
      transferTask.task_index = this.$props.formData.form_transfer_tasks.length
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
    transferType: function (id) {
      return this.$data.transferList.filter(transfer => transfer.type_id === id).map(transfer => transfer.type_code).shift()
    },
    transferEditModalClose: function (type) {
      this.$data.transferEditModalState[type] = false
    },
    transferEditModalOpen: function () {
      this.$data.transferEditModalState[this.$data.selectedTransferType] = true
    },
    transferDeleteModalOpen: function (index) {
      this.selectedTransferTask = index
      this.$data.transferTaskDeleteModalState = 1
    },
    transferDeleteModalClose: function () {
      this.$data.transferTaskDeleteModalState = 0
    },
    transferDelete: function (index) {
      var tmp = this.$data.transferTask.filter(task => task.del_flg === 0)[index]
      this.$data.transferTask.forEach((task, index) => {
        if (task === tmp) {
          this.$set(this.$data.transferTask[index], 'del_flg', 1)
        }
      })
    }
  }
}
</script>
