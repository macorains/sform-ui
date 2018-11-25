<template>
  <div class="form_edit">
    <div class="container">
    <h1>FormEdit</h1>

    <b-container class="text-left">
      <b-form-row>
        <b-col>
          <b-form-group id="formNameGroup" label-for="formName" label="フォーム名">
            <b-form-input id="formName" type="text" v-model="formData.name"></b-form-input>
          </b-form-group>
          <b-form-group id="formTitleGroup" label-for="formTitle" label="フォームタイトル">
            <b-form-input id="formTitle" type="text" v-model="formData.title"></b-form-input>
          </b-form-group>
          <b-form-group id="urlAfterCancelGroup" label-for="urlAfterCancel" label="キャンセル後遷移先URL">
            <b-form-input id="urlAfterCancel" type="text" v-model="formData.cancelUrl"></b-form-input>
          </b-form-group>
          <b-form-group id="urlAfterCompleteGroup" label-for="urlAfterComplete" label="完了後遷移先URL">
            <b-form-input id="urlAfterComplete" type="text" v-model="formData.completeUrl"></b-form-input>
          </b-form-group>
          <b-form-group id="formInputHeaderGroup" label-for="formInputHeader" label="フォーム入力画面メッセージ">
            <b-form-textarea id="formInputHeader" :rows=3 :max-rows=10 v-model="formData.inputHeader"></b-form-textarea>
          </b-form-group>
          <b-form-group id="formConfirmHeaderGroup" label-for="formConfirmHeader" label="フォーム確認画面メッセージ">
            <b-form-textarea id="formConfirmHeader" :rows=3 :max-rows=10 v-model="formData.confirmHeader"></b-form-textarea>
          </b-form-group>
          <b-form-group id="formCompleteTextGroup" label-for="formCompleteText" label="フォーム完了画面メッセージ">
            <b-form-textarea id="formCompleteText" :rows=3 :max-rows=10 v-model="formData.completeText"></b-form-textarea>
          </b-form-group>
          <b-form-group id="formStopTextGroup" label-for="formStopText" label="フォーム停止時メッセージ">
            <b-form-textarea id="formStopText" :rows=3 :max-rows=10 v-model="formData.closeText"></b-form-textarea>
          </b-form-group>
          <!-- フォーム項目設定 -->
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">項目名</th>
                <th scope="col">項目ID</th>
                <th scope="col">型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in formData.formCols" v-bind:key="item.index">
                <th scope="row">{{item.index}}</th>
                <td>{{item.name}}</td>
                <td>{{item.colId}}</td>
                <td>{{item.colType}}</td>
              </tr>
            </tbody>
          </table>

          <!-- Transfer設定 -->
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
        </b-col>
      </b-form-row>
    </b-container>


    <b-button class="mt-4">Cancel</b-button>
    <b-button class="mt-4">Save Change</b-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'formedit',
  props: ['serverUri', 'hashedFormId'],
  data: function () {
    return {
      formData: {},
      transferTask: {}
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    let config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri
      }
    }
    axios.get(this.$props.serverUri + 'form/' + this.$props.hashedFormId, config)
    .then(response => {
      this.$data.formData = response.data.dataset
    })
    axios.get(this.$props.serverUri + 'transfertask/' + this.$props.hashedFormId, config)
    .then(response => {
      this.$data.transferTask = response.data.dataset
    })
  }
}
</script>


<style scoped>

</style>
