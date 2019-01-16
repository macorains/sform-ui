<template>
  <div class="transfers">
    <h3>転送タスク</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">転送名</th>
          <th scope="col">転送タイプ</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in transferTask" v-bind:key="task.id" v-on:click="edit(index, task.transfer_type_id)">
          <th scope="row">{{index+1}}</th>
          <td>{{task.name}}</td>
          <td>{{transferType(task.transfer_type_id)}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <salesforceTransferEdit ref="salesforceTransferEdit" 
        v-bind:serverUri="serverUri" 
        v-bind:transferEditModalState="transferEditModalState" 
        v-bind:transferTask="transferTask[selectedTransferTask]"
        v-bind:formCols="formCols"
        @transferEditModalClose = "transferEditModalClose">
    </salesforceTransferEdit>
    <mailTransferEdit ref="mailTransferEdit" 
        v-bind:serverUri="serverUri" 
        v-bind:transferEditModalState="transferEditModalState" 
        v-bind:transferTask="transferTask[selectedTransferTask]"
        v-bind:formCols="formCols"
        @transferEditModalClose = "transferEditModalClose">
    </mailTransferEdit>
  </div>
</template>
<script>
import axios from 'axios'
import SalesforceTransferEdit from './SalesforceTransferEdit.vue'
import MailTransferEdit from './MailTransferEdit.vue'

export default {
  name: 'transfers',
  props: ['serverUri', 'hashedFormId', 'formCols'],
  components: {
    'salesforceTransferEdit': SalesforceTransferEdit,
    'mailTransferEdit': MailTransferEdit
  },
  data: function () {
    return {
      transferTask: {},
      transferList: [],
      transferEditModalState: [],
      selectedTransferTask: 0
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
      axios.get(this.$props.serverUri + 'transfertask/list/' + this.$props.hashedFormId, this.$data.config)
      .then(response => {
        this.$data.transferTask = response.data.dataset
      })
      axios.get(this.$props.serverUri + 'transfer', this.$data.config)
      .then(response => {
        this.$data.transferList = response.data
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
    }
  },
  watch: {
    transferTask: function () {
      this.$emit('updateTransferTask', this.$data.transferTask)
    }
  }
}
</script>