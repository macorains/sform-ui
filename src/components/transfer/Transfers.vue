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
        <tr v-for="(task, index) in transferTask" v-bind:key="task.id" v-on:click="edit(task.id, task.transfer_type_id)">
          <th scope="row">{{index+1}}</th>
          <td>{{task.name}}</td>
          <td>{{transferType(task.transfer_type_id)}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <salesforceTransferEdit ref="salesforceTransferEdit" v-bind:serverUri="serverUri" v-bind:hashedFormId="hashedFormId" v-bind:transferEditModalState="transferEditModalState"></salesforceTransferEdit>
  </div>
</template>
<script>
import axios from 'axios'
import SalesforceTransferEdit from './SalesforceTransferEdit.vue'

export default {
  name: 'transfers',
  props: ['serverUri', 'hashedFormId'],
  components: {
    'salesforceTransferEdit': SalesforceTransferEdit
  },
  data: function () {
    return {
      transferTask: {},
      transferList: [],
      transferEditModalState: 0
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
    axios.get(this.$props.serverUri + 'transfertask/' + this.$props.hashedFormId, this.$data.config)
    .then(response => {
      this.$data.transferTask = response.data.dataset
    })
    axios.get(this.$props.serverUri + 'transfer', this.$data.config)
    .then(response => {
      console.log(response.data)
      this.$data.transferList = response.data
    })
  },
  methods: {
    edit: function (id, type) {
      console.log('id: ' + id + '  type: ' + type)
      // console.log(this.$refs.salesforceTransferEdit)
      // this.$refs.salesforceTransferEdit.modalSalesforceTransferRuleSetting.show()
      // this.parent.$refs.salesforceTransferEdit.show()
      this.$data.transferEditModalState = 1
    },
    transferType: function (id) {
      return this.$data.transferList.filter(transfer => transfer.type_id === id).map(transfer => transfer.name).shift()
    }
  }
}
</script>