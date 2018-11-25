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
        <tr v-for="(task, index) in transferTask" v-bind:key="task.id">
          <th scope="row">{{index+1}}</th>
          <td>{{task.name}}</td>
          <td>{{task.transfer_type_id}}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'transfers',
  props: ['serverUri', 'hashedFormId'],
  data: function () {
    return {
      transferTask: {}
    }
  },
  created: function () {
    axios.get(this.$props.serverUri + 'transfertask/' + this.$props.hashedFormId, this.$data.config)
    .then(response => {
      this.$data.transferTask = response.data.dataset
    })
  }
}
</script>