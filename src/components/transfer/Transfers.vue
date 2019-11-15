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
          v-for="(task, index) in transferTask"
          :key="task.id"
          @click="edit(index, task.transfer_type_id)"
        >
          <th scope="row">
            {{ index+1 }}
          </th>
          <td>{{ task.name }}</td>
          <td>{{ transferType(task.transfer_type_id) }}</td>
          <td />
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
            @click="transferEditModalOpen"
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
      :server-uri="serverUri"
      :transfer-edit-modal-state="transferEditModalState"
      :transfer-task="transferTask[selectedTransferTask]"
      :form-cols="formCols"
      @transferEditModalClose="transferEditModalClose"
    />
    <mailTransferEdit
      ref="mailTransferEdit"
      :server-uri="serverUri"
      :transfer-edit-modal-state="transferEditModalState"
      :transfer-task="transferTask[selectedTransferTask]"
      :form-cols="formCols"
      @transferEditModalClose="transferEditModalClose"
    />
  </div>
</template>
<script>
import axios from 'axios'
import SalesforceTransferEdit from './SalesforceTransferEdit.vue'
import MailTransferEdit from './MailTransferEdit.vue'

export default {
  name: 'Transfers',
  components: {
    'salesforceTransferEdit': SalesforceTransferEdit,
    'mailTransferEdit': MailTransferEdit
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
      transferTask: {},
      transferList: [],
      transferEditModalState: [],
      selectedTransferTask: 0,
      selectedTransferType: 0,
      optionTransferType: []
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
    console.log(this.$data.config)
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
    transferType: function (id) {
      return this.$data.transferList.filter(transfer => transfer.type_id === id).map(transfer => transfer.name).shift()
    },
    transferEditModalClose: function (id) {
      this.$data.transferEditModalState[id] = 0
    },
    transferEditModalOpen: function () {
      this.$set(this.$data.transferEditModalState, this.$data.selectedTransferType, 1)
    }
  }
}
</script>
