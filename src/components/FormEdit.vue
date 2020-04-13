<template>
  <div class="form_edit">
    <div class="container">
      <h1 class="mt-5 mb-5">
        {{ $t('message.form_edit') }}
      </h1>
      <b-container class="text-left">
        <b-form-row>
          <b-col>
            <b-form-group
              id="formNameStatus"
              label-for="status"
              :label="$t('message.form_status')"
            >
              <b-form-radio-group
                id="status"
                v-model="formData.status"
                name="status"
              >
                <b-form-radio value="0">
                  {{ $t('message.form_status_invalid') }}
                </b-form-radio>
                <b-form-radio value="1">
                  {{ $t('message.form_status_valid') }}
                </b-form-radio>
                <b-form-radio value="2">
                  {{ $t('message.form_status_suspend') }}
                </b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              id="formNameGroup"
              label-for="formName"
              :label="$t('message.form_name')"
            >
              <b-form-input
                id="formName"
                v-model="formData.name"
                type="text"
              />
            </b-form-group>
            <b-form-group
              id="formTitleGroup"
              label-for="formTitle"
              :label="$t('message.form_title')"
            >
              <b-form-input
                id="formTitle"
                v-model="formData.title"
                type="text"
              />
            </b-form-group>
            <b-form-group
              id="urlAfterCancelGroup"
              label-for="urlAfterCancel"
              :label="$t('message.url_after_cancel')"
            >
              <b-form-input
                id="urlAfterCancel"
                v-model="formData.cancelUrl"
                type="text"
              />
            </b-form-group>
            <b-form-group
              id="urlAfterCompleteGroup"
              label-for="urlAfterComplete"
              :label="$t('message.url_after_complete')"
            >
              <b-form-input
                id="urlAfterComplete"
                v-model="formData.completeUrl"
                type="text"
              />
            </b-form-group>
            <b-form-group
              id="formInputHeaderGroup"
              label-for="formInputHeader"
              :label="$t('message.message_at_input')"
            >
              <b-form-textarea
                id="formInputHeader"
                v-model="formData.inputHeader"
                :rows="3"
                :max-rows="10"
              />
            </b-form-group>
            <b-form-group
              id="formConfirmHeaderGroup"
              label-for="formConfirmHeader"
              :label="$t('message.message_at_confirm')"
            >
              <b-form-textarea
                id="formConfirmHeader"
                v-model="formData.confirmHeader"
                :rows="3"
                :max-rows="10"
              />
            </b-form-group>
            <b-form-group
              id="formCompleteTextGroup"
              label-for="formCompleteText"
              :label="$t('message.message_at_complete')"
            >
              <b-form-textarea
                id="formCompleteText"
                v-model="formData.completeText"
                :rows="3"
                :max-rows="10"
              />
            </b-form-group>
            <b-form-group
              id="formStopTextGroup"
              label-for="formStopText"
              :label="$t('message.message_at_close')"
            >
              <b-form-textarea
                id="formStopText"
                v-model="formData.closeText"
                :rows="3"
                :max-rows="10"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-row class="mt-3">
          <b-col>
            <!-- フォーム項目設定 -->
            <h3>
              {{ $t('message.form_column') }}
            </h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">
                    No.
                  </th>
                  <th scope="col">
                    {{ $t('message.column_name') }}
                  </th>
                  <th scope="col">
                    {{ $t('message.column_id') }}
                  </th>
                  <th scope="col">
                    {{ $t('message.type') }}
                  </th>
                  <th scope="col">
                    {{ $t('message.action') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in formData.formCols"
                  :key="item.index"
                >
                  <th scope="row">
                    {{ Number(item.index)+1 }}
                  </th>
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ item.colId }}
                  </td>
                  <td>
                    {{ colTypeName(item.coltype) }}
                  </td>
                  <td>
                    <b-btn
                      size="sm"
                      @click="startEditCol(item.index)"
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
                      @click="deleteCol(item.index)"
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
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-btn
              class="mt-3"
              block
              @click="addFormCol"
            >
              <span
                class="oi oi-plus"
                title="plus"
                aria-hidden="true"
              />
              {{ $t('message.add_column') }}
            </b-btn>
          </b-col>
          <b-col>
            <b-btn
              class="mt-3"
              block
              @click="reorderColStart"
            >
              <span
                class="oi oi-random"
                title="random"
                aria-hidden="true"
              />{{ $t('message.reorder') }}
            </b-btn>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- フォーム項目並び替え -->
            <formColEditOrder
              :form-col-data="formData.formCols"
              :form-col-edit-order-modal-state="formColEditOrderModalState"
              @reorderColEnd="reorderColEnd"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col>
            <!-- Transfer設定 -->
            <transfers
              :server-uri="serverUri"
              :hashed-form-id="hashedFormId"
              :form-cols="formData.formCols"
              @updateTransferTask="updateTransferTask"
            />
          </b-col>
        </b-row>
        <b-row class="mt-3 border-top">
          <b-col>
            <b-button
              class="mt-4"
              @click="cancel"
            >
              <span
                class="oi oi-x"
                title="x"
                aria-hidden="true"
              />
              {{ $t('message.cancel') }}
            </b-button>
            <b-button
              class="mt-4"
              @click="save"
            >
              <span
                class="oi oi-check"
                title="check"
                aria-hidden="true"
              />
              {{ $t('message.save_change') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-modal
        ref="modalColedit"
        size="lg"
        :title="$t('message.edit_form_item')"
      >
        <b-container class="text-left form-col-edit">
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.column_name') }}
            </b-col>
            <b-col>
              <b-form-input
                id="formColName"
                v-model="formColData.name"
                type="text"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.column_id') }}
            </b-col>
            <b-col>
              <b-form-input
                id="formColId"
                v-model="formColData.colId"
                type="text"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.type') }}
            </b-col>
            <b-col>
              <b-form-select
                v-model="formColData.coltype"
                :options="optionFormColType"
                class="mb-3"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.select_items') }}
            </b-col>
            <b-col>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      No.
                    </th>
                    <th scope="col">
                      {{ $t('message.label') }}
                    </th>
                    <th scope="col">
                      {{ $t('message.value') }}
                    </th>
                    <th scope="col">
                      {{ $t('message.action') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in formColData.selectList"
                    :key="item.index"
                  >
                    <th scope="row">
                      {{ Number(index) + 1 }}
                    </th>
                    <td>
                      <span v-show="!item.inEdit">
                        {{ item.displayText }}
                      </span>
                      <b-form-input
                        v-show="item.inEdit"
                        id="displayText"
                        v-model="item.displayText"
                        type="text"
                      />
                    </td>
                    <td>
                      <span v-show="!item.inEdit">
                        {{ item.value }}
                      </span>
                      <b-form-input
                        v-show="item.inEdit"
                        id="value"
                        v-model="item.value"
                        type="text"
                      />
                    </td>
                    <td>
                      <b-btn
                        v-show="!item.inEdit"
                        size="sm"
                        @click="deleteColSelectList(item.index)"
                      >
                        <span
                          class="oi oi-trash"
                          title="trash"
                          aria-hidden="true"
                        />
                        {{ $t('message.delete') }}
                      </b-btn>
                      <b-btn
                        v-show="!item.inEdit"
                        size="sm"
                        @click="editColSelectList(item.index)"
                      >
                        <span
                          class="oi oi-x"
                          title="x"
                          aria-hidden="true"
                        />
                        {{ $t('message.edit') }}
                      </b-btn>
                      <b-btn
                        v-show="item.inEdit"
                        size="sm"
                        @click="endEditColSelectList(item.index)"
                      >
                        <span
                          class="oi oi-check"
                          title="check"
                          aria-hidden="true"
                        />
                        {{ $t('message.ok') }}
                      </b-btn>
                    </td>
                  </tr>
                </tbody>
              </table>
              <b-btn
                class="mt-3"
                block
                @click="addColSelectList"
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
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.initial_value') }}
            </b-col>
            <b-col>
              <b-form-input
                id="formColDefault"
                v-model="formColData.default"
                type="text"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.validation') }}
            </b-col>
            <b-col>
              <b-form-select
                v-model="formColData.validations.inputType"
                :options="optionFormColValidation"
                class="mb-3"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.number_range') }}
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMinValue"
                v-model="formColData.validations.minValue"
                type="text"
              />
            </b-col>
            <b-col cols="1">
              ～
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMaxValue"
                v-model="formColData.validations.maxValue"
                type="text"
              />
            </b-col>
            <b-col cols="5" />
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.string_length') }}
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMinLength"
                v-model="formColData.validations.minLength"
                type="text"
              />
            </b-col>
            <b-col cols="1">
              ～
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMaxLength"
                v-model="formColData.validations.maxLength"
                type="text"
              />
            </b-col>
            <b-col cols="5" />
          </b-row>
          <b-row class="mb-3">
            <b-col cols="4">
              {{ $t('message.required_item') }}
            </b-col>
            <b-col>
              <b-form-checkbox
                id="formColRequired"
                v-model="formColData.validations.required"
                value="true"
                unchecked-value="false"
              />
            </b-col>
          </b-row>
        </b-container>
        <div
          slot="modal-footer"
          class="w-100"
        >
          <b-col>
            <b-btn
              class="mt-3"
              block
              @click="endEditCol"
            >
              <span
                class="oi oi-check"
                title="check"
                aria-hidden="true"
              />
              {{ $t('message.end_edit') }}
            </b-btn>
          </b-col>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import FormColEditOrder from './FormColEditOrder.vue'
import Transfers from './transfer/Transfers.vue'

export default {
  name: 'FormEdit',
  components: {
    'transfers': Transfers,
    'formColEditOrder': FormColEditOrder
  },
  props: {
    'serverUri': {
      type: String,
      default: ''
    },
    'hashedFormId': {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      formColData: {validations: {}, selectList: {}},
      formData: {},
      transferTask: {},
      config: {},
      formColEditOrderModalState: 0,
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
    if (!this.$props.hashedFormId) {
      this.$router.push({path: '/formlist'})
      return
    }
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        'timeout': 3000
      }
    }
    this.$http.get(this.$props.serverUri + '/form/' + this.$props.hashedFormId, this.$data.config)
      .then(response => {
        this.$data.formData = response.data.dataset
      })
  },
  methods: {
    save: function () {
      var reqdata = {
        objtype: 'Form',
        action: 'create',
        rcdata: {formDef: this.$data.formData, transferTasks: this.$data.transferTask}
      }
      this.$http.post(this.$props.serverUri + '/form', reqdata, this.$data.config)
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    },
    cancel: function () {
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    },
    addFormCol: function () {
      var i = Object.keys(this.$data.formData.formCols).length
      var tmp = {
        index: i + '',
        name: '項目' + i,
        colId: 'col' + i,
        coltype: '1',
        default: '',
        validations: {
          inputType: '0',
          minValue: '0',
          maxValue: '0',
          minLength: '0',
          maxLength: '0'
        },
        selectList: {}
      }
      this.$set(this.$data.formData.formCols, i, tmp)
    },
    startEditCol: function (index) {
      this.$data.formColData = this.$data.formData.formCols[index]
      this.$refs.modalColedit.show()
    },
    endEditCol: function () {
      this.$refs.modalColedit.hide()
    },
    deleteCol: function (index) {
      this.$delete(this.$data.formData.formCols, index)
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
    },
    deleteColSelectList: function (index) {
      this.$delete(this.$data.formColData.selectList, index)
    },
    editColSelectList: function (index) {
      for (var sel in this.$data.formColData.selectList) {
        this.$set(this.$data.formColData.selectList[sel], 'inEdit', sel === index)
      }
    },
    endEditColSelectList: function (index) {
      this.$set(this.$data.formColData.selectList[index], 'inEdit', false)
    },
    reorderColStart: function () {
      this.$data.formColEditOrderModalState = 1
    },
    reorderColEnd: function (formCols) {
      this.$data.formColEditOrderModalState = 0
      this.$data.formData.formCols = {}
      for (var col in formCols) {
        this.$data.formData.formCols[col] = formCols[col]
        this.$data.formData.formCols[col].index = col
      }
    },
    updateTransferTask: function (transferTask) {
      this.$data.transferTask = transferTask
    },
    colTypeName: function (type) {
      return this.$data.optionFormColType
        .filter(op => Number(op.value) === Number(type))
        .map(op => op.text)
        .shift()
    }
  }

}
</script>
<style scoped>
  .form-col-edit {
    height: 500px;
    overflow-y: auto;
  }
</style>
