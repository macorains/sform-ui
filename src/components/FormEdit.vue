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
        </b-col>
      </b-form-row>
      <b-row>
        <b-col>
          <!-- フォーム項目設定 -->
          <h3>フォーム項目</h3>
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
              <tr v-for="item in formData.formCols" v-bind:key="item.index" v-on:click="startEditCol(item.index)">
                <th scope="row">{{item.index}}</th>
                <td>{{item.name}}</td>
                <td>{{item.colId}}</td>
                <td>{{item.colType}}</td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <!-- Transfer設定 -->
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
        </b-col>
      </b-row>
    </b-container>

    <b-modal size="lg" ref="modalColedit" hide-footer title="フォーム項目編集">
      <b-container class="text-left">
        <b-row class="mb-3">
          <b-col cols="4">項目名</b-col>
          <b-col><b-form-input id="formColName" type="text" v-model="formColData.name"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">項目ID</b-col>
          <b-col><b-form-input id="formColId" type="text" v-model="formColData.colId"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">型</b-col>
          <b-col><b-form-input id="formColType" type="text" v-model="formColData.coltype"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">選択項目</b-col>
          <b-col>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">表示文字列</th>
                  <th scope="col">値</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in formColData.selectList" v-bind:key="item.index">
                  <th scope="row">{{item.index}}</th>
                  <td>{{item.displayText}}</td>
                  <td>{{item.value}}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">初期値</b-col>
          <b-col><b-form-input id="formColDefault" type="text" v-model="formColData.default"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">バリデーション</b-col>
          <b-col><b-form-input id="formColId" type="text" v-model="formColData.colId"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">数値範囲</b-col>
          <b-col cols="2"><b-form-input id="formColValidationMinValue" type="text" v-model="formColData.validations.minValue"></b-form-input></b-col>
          <b-col cols="1">～</b-col>
          <b-col cols="2"><b-form-input id="formColValidationMaxValue" type="text" v-model="formColData.validations.maxValue"></b-form-input></b-col>
          <b-col cols="5"></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">文字数範囲</b-col>
          <b-col cols="2"><b-form-input id="formColValidationMinLength" type="text" v-model="formColData.validations.minLength"></b-form-input></b-col>
          <b-col cols="1">～</b-col>
          <b-col cols="2"><b-form-input id="formColValidationMaxLength" type="text" v-model="formColData.validations.maxLength"></b-form-input></b-col>
          <b-col cols="5"></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">必須項目</b-col>
          <b-col><b-form-input id="formColRequired" type="text" v-model="formColData.required"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col><b-btn class="mt-3" block @click="endEditCol">編集終了</b-btn></b-col>
        </b-row>
      </b-container>
    </b-modal>


    <b-button class="mt-4" v-on:click="cancel">Cancel</b-button>
    <b-button class="mt-4" v-on:click="save">Save Change</b-button>
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
      formColData: {validations: {}},
      formData: {},
      transferTask: {},
      config: {}
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
    axios.get(this.$props.serverUri + 'form/' + this.$props.hashedFormId, this.$data.config)
    .then(response => {
      this.$data.formData = response.data.dataset
      console.log(this.$data.formData)
    })
    axios.get(this.$props.serverUri + 'transfertask/' + this.$props.hashedFormId, this.$data.config)
    .then(response => {
      this.$data.transferTask = response.data.dataset
    })
  },
  methods: {
    save: function () {
      var reqdata = {
        objtype: 'Form',
        action: 'create',
        rcdata: {formDef: this.$data.formData, transferTasks: this.$data.transferTask}
      }
      axios.post(this.$props.serverUri + 'form', reqdata, this.$data.config)
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    },
    cancel: function () {
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    },
    startEditCol: function (index) {
      this.$data.formColData = this.$data.formData.formCols[index]
      this.$refs.modalColedit.show()
    },
    endEditCol: function () {
      this.$refs.modalColedit.hide()
    }
  }
}
</script>


<style scoped>

</style>
