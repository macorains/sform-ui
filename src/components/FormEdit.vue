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
          <transfers v-bind:serverUri="serverUri" v-bind:hashedFormId="hashedFormId"></transfers>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button class="mt-4" v-on:click="cancel">Cancel</b-button>
          <b-button class="mt-4" v-on:click="save">Save Change</b-button>
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
          <b-col><b-form-select v-model="formColData.coltype" :options="optionFormColType" class="mb-3" /></b-col>
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
            <b-btn class="mt-3" block @click="addColSelectList">追加</b-btn>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">初期値</b-col>
          <b-col><b-form-input id="formColDefault" type="text" v-model="formColData.default"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">バリデーション</b-col>
          <b-col><b-form-select v-model="formColData.validations.inputType" :options="optionFormColValidation" class="mb-3" /></b-col>
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
          <b-col><b-form-checkbox id="formColRequired" v-model="formColData.required" value="true" unchecked-value="false"/></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col><b-btn class="mt-3" block @click="endEditCol">編集終了</b-btn></b-col>
        </b-row>
      </b-container>
    </b-modal>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Transfers from './transfer/Transfers.vue'

export default {
  name: 'formedit',
  components: {
    'transfers': Transfers
  },
  props: ['serverUri', 'hashedFormId'],
  data: function () {
    return {
      formColData: {validations: {}, selectList: {}},
      formData: {},
      config: {},
      optionFormColValidation: [
        {value: '0', text: '無制限'},
        {value: '1', text: '数値のみ'},
        {value: '2', text: '英数字のみ'},
        {value: '3', text: 'ひらがなのみ'},
        {value: '4', text: 'カタカナのみ'},
        {value: '5', text: 'メールアドレス'},
        {value: '6', text: '郵便番号'}
      ],
      optionFormColType: [
        {value: '1', text: 'テキスト'},
        {value: '2', text: 'コンボボックス（単一選択）'},
        {value: '3', text: 'チェックボックス（複数選択）'},
        {value: '4', text: 'ラジオボタン（単一選択）'},
        {value: '5', text: 'テキストエリア'},
        {value: '6', text: '隠しテキスト'},
        {value: '7', text: '表示テキスト（非入力項目）'}
      ]
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
    .catch(function (error) {
      console.log(error.text)
      this.$router.push({name: 'signin'})
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
    },
    addColSelectList: function () {
      var colSize = Object.keys(this.$data.formColData.selectList).length
      var tmp = {
        index: colSize + '',
        displayText: '選択項目' + colSize,
        value: colSize + '',
        default: 'false',
        viewStyle: 'display:inline',
        editStyle: 'display:none'
      }
      this.$set(this.$data.formColData.selectList, colSize, tmp)
    }
  }
}
</script>
<style scoped>

</style>
