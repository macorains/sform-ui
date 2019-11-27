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
            転送タイプ
          </th>
          <th scope="col">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(task, index) in filteredTransferTaskList"
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
              @click="edit(index, task.transfer_type_id)"
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
              @click="transferDeleteModalOpen()"
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
      <b-row class="text-right">
        <b-col cols="7" />
        <b-col
          cols="3"
          class="text-right"
        >
          <b-form-select
            v-model="selectedTransferType"
            :options="optionTransferType"
            class="mb-3"
          />
        </b-col>
        <b-col cols="2">
          <b-btn
            block
            size="sm"
            @click="newEdit(selectedTransferType)"
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
    <salesforceTransferEdit
      ref="salesforceTransferEdit"
      :hashed-form-id="hashedFormId"
      :server-uri="serverUri"
      :transfer-edit-modal-state="transferEditModalState"
      :transfer-task="transferTask[selectedTransferTask]"
      :form-cols="formCols"
      @transferEditModalClose="transferEditModalClose"
      @setDefault="setDefault"
    />
    <mailTransferEdit
      ref="mailTransferEdit"
      :hashed-form-id="hashedFormId"
      :server-uri="serverUri"
      :transfer-edit-modal-state="transferEditModalState"
      :transfer-task="transferTask[selectedTransferTask]"
      :form-cols="formCols"
      @transferEditModalClose="transferEditModalClose"
      @setDefault="setDefault"
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
import SalesforceTransferEdit from './SalesforceTransferEdit.vue'
import MailTransferEdit from './MailTransferEdit.vue'
import TransferTaskDeleteModal from './TransferTaskDeleteModal.vue'

export default {
  name: 'Transfers',
  components: {
    'salesforceTransferEdit': SalesforceTransferEdit,
    'mailTransferEdit': MailTransferEdit,
    'transferTaskDeleteModal': TransferTaskDeleteModal
  },
  props: {
    'serverUri': {
      type: String,
      default: ''
    },
    'hashedFormId': {
      type: String,
      default: ''
    },
    'formCols': {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      transferTask: [],
      transferList: [],
      transferEditModalState: [],
      transferTaskDeleteModalState: 0,
      selectedTransferTask: 0,
      selectedTransferType: 0,
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
      axios.get(this.$props.serverUri + '/transfertask/list/' + this.$props.hashedFormId, this.$data.config)
        .then(response => {
          this.$data.transferTask = response.data.dataset
        })
      axios.get(this.$props.serverUri + '/transfer', this.$data.config)
        .then(response => {
          this.$data.transferList = response.data
          this.$data.optionTransferType = this.$data.transferList.map(tr => ({value: tr.type_id, text: tr.name}))
        })
    }
  },
  methods: {
    edit: function (index, type) {
      this.selectedTransferTask = index
      this.$set(this.$data.transferEditModalState, type, 1)
    },
    newEdit: function (type) {
      var len = this.$data.transferTask.length
      this.$set(this.$data.transferTask, len, {})
      this.edit(len, type)
    },
    setDefault: function (data) {
      this.$set(this.$data.transferTask, this.$data.selectedTransferTask, data)
    },
    transferType: function (id) {
      return this.$data.transferList.filter(transfer => transfer.type_id === id).map(transfer => transfer.name).shift()
    },
    transferEditModalClose: function (id) {
      this.$data.transferEditModalState[id] = 0
    },
    transferEditModalOpen: function () {
      this.$set(this.$data.transferEditModalState, this.$data.selectedTransferType, 1)
    },
    transferDeleteModalOpen: function () {
      this.$data.transferTaskDeleteModalState = 1
    },
    transferDeleteModalClose: function () {
      this.$data.transferTaskDeleteModalState = 0
    },
    transferDelete: function (index) {
      this.$set(this.$data.transferTask[index], 'del_flg', 1)
    }
  }
}
</script>
