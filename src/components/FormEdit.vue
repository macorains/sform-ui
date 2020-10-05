<template>
  <div class="form_edit">
    <div
      v-show="loading"
      class="loader"
    >
      Now loading...
    </div>
    <div
      v-show="!loading"
      class="container"
    >
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
                v-model.number="formData.status"
                type="number"
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
                v-model="formData.cancel_url"
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
                v-model="formData.complete_url"
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
                v-model="formData.input_header"
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
                v-model="formData.confirm_header"
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
                v-model="formData.complete_text"
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
                v-model="formData.close_text"
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
                  v-for="item in formData.form_cols"
                  :key="item.col_index"
                >
                  <th scope="row">
                    {{ Number(item.col_index)+1 }}
                  </th>
                  <td>
                    {{ item.name }}
                  </td>
                  <td>
                    {{ item.col_id }}
                  </td>
                  <td>
                    {{ colTypeName(item.col_type) }}
                  </td>
                  <td>
                    <b-btn
                      size="sm"
                      @click="startEditCol(item.col_index)"
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
                      @click="deleteCol(item.col_index)"
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
              :form-col-data="formData.form_cols"
              :form-col-edit-order-modal-state="formColEditOrderModalState"
              @reorderColEnd="reorderColEnd"
            />
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col>
            <!-- Transfer設定 -->
            <transferTasks
              :server-uri="serverUri"
              :hashed-form-id="hashedFormId"
              :form-data="formData"
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
        :centered="true"
        size="xl"
        content-class="height:1000px"
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
                v-model="formData.form_cols[inEditFormColIndex].name"
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
                v-model="formData.form_cols[inEditFormColIndex].col_id"
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
                v-model="formData.form_cols[inEditFormColIndex].col_type"
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
                    v-for="(item, index) in formData.form_cols[inEditFormColIndex].select_list"
                    :key="item.select_index"
                  >
                    <th scope="row">
                      {{ Number(index) + 1 }}
                    </th>
                    <td>
                      <span v-show="!item.in_edit">
                        {{ item.select_name }}
                      </span>
                      <b-form-input
                        v-show="item.in_edit"
                        v-model="item.select_name"
                        type="text"
                      />
                    </td>
                    <td>
                      <span v-show="!item.in_edit">
                        {{ item.select_value }}
                      </span>
                      <b-form-input
                        v-show="item.in_edit"
                        v-model="item.select_value"
                        type="text"
                      />
                    </td>
                    <td>
                      <b-btn
                        v-show="!item.in_edit"
                        size="sm"
                        @click="deleteColSelectList(item.select_index)"
                      >
                        <span
                          class="oi oi-trash"
                          title="trash"
                          aria-hidden="true"
                        />
                        {{ $t('message.delete') }}
                      </b-btn>
                      <b-btn
                        v-show="!item.in_edit"
                        size="sm"
                        @click="editColSelectList(item.select_index)"
                      >
                        <span
                          class="oi oi-x"
                          title="x"
                          aria-hidden="true"
                        />
                        {{ $t('message.edit') }}
                      </b-btn>
                      <b-btn
                        v-show="item.in_edit"
                        size="sm"
                        @click="endEditColSelectList(item.select_index)"
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
                v-model="formData.form_cols[inEditFormColIndex].default"
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
                v-model="formData.form_cols[inEditFormColIndex].validations.input_type"
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
                v-model="formData.form_cols[inEditFormColIndex].validations.min_value"
                type="text"
              />
            </b-col>
            <b-col cols="1">
              ～
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMaxValue"
                v-model="formData.form_cols[inEditFormColIndex].validations.max_value"
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
                v-model="formData.form_cols[inEditFormColIndex].validations.min_length"
                type="text"
              />
            </b-col>
            <b-col cols="1">
              ～
            </b-col>
            <b-col cols="2">
              <b-form-input
                id="formColValidationMaxLength"
                v-model="formData.form_cols[inEditFormColIndex].validations.max_length"
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
                v-model="formData.form_cols[inEditFormColIndex].validations.required"
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
import TransferTasks from './transferTask/TransferTasks.vue'

export default {
  name: 'FormEdit',
  components: {
    transferTasks: TransferTasks,
    formColEditOrder: FormColEditOrder
  },
  props: {
    serverUri: {
      type: String,
      default: ''
    },
    hashedFormId: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      formColData: { validations: {}, selectList: {} },
      formData: {
        form_cols: [
          {
            name: '',
            validations: {
              input_type: 1
            }
          }
        ],
        form_transfer_tasks: [
          {
            mail: {
              subject: ''
            }
          }
        ]
      },
      transferTask: {},
      config: {},
      inEditFormColIndex: 0,
      formColEditOrderModalState: 0,
      optionFormColValidation: [
        { value: 0, text: '無制限' },
        { value: 1, text: '数値のみ' },
        { value: 2, text: '英数字のみ' },
        { value: 3, text: 'ひらがなのみ' },
        { value: 4, text: 'カタカナのみ' },
        { value: 5, text: 'メールアドレス' },
        { value: 6, text: '郵便番号' }
      ],
      optionFormColType: [
        { value: 1, text: 'テキスト' },
        { value: 2, text: 'コンボボックス（単一選択）' },
        { value: 3, text: 'チェックボックス（複数選択）' },
        { value: 4, text: 'ラジオボタン（単一選択）' },
        { value: 5, text: 'テキストエリア' },
        { value: 6, text: '隠しテキスト' },
        { value: 7, text: '表示テキスト（非入力項目）' }
      ],
      loading: false
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    if (!this.$props.hashedFormId) {
      this.$router.push({ path: '/formlist' })
      return
    }
    this.$data.loading = true
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        timeout: 3000
      }
    }
    this.$http.get(this.$props.serverUri + '/form/' + this.$props.hashedFormId, this.$data.config)
      .then(response => {
        this.$data.formData = response.data
        this.$data.loading = false
      })
  },
  methods: {
    save: function () {
      const op = (!this.$data.formData.id) ? '/form/new' : '/form'
      this.$http.post(this.$props.serverUri + op, this.$data.formData, this.$data.config)
        .then(response => {
          this.$router.push({ path: 'formlist', params: { serverUri: this.$props.serverUri } })
        })
    },
    cancel: function () {
      this.$router.push({ path: 'formlist', params: { serverUri: this.$props.serverUri } })
    },
    addFormCol: function () {
      var i = Object.keys(this.$data.formData.form_cols).length
      var colNum = i + 1
      var tmp = {
        col_index: i,
        name: '項目' + colNum,
        col_id: 'col' + colNum,
        col_type: 1,
        default_value: '',
        form_id: this.$data.formData.id,
        id: null,
        validations: {
          input_type: 0,
          min_value: 0,
          max_value: 0,
          min_length: 0,
          max_length: 0,
          form_col_id: null,
          form_id: this.$data.formData.id,
          required: false
        },
        select_list: []
      }
      this.$set(this.$data.formData.form_cols, i, tmp)
    },
    startEditCol: function (index) {
      this.$data.inEditFormColIndex = index
      this.$data.formColData = this.$data.formData.form_cols[index]
      this.$refs.modalColedit.show()
    },
    endEditCol: function () {
      this.$refs.modalColedit.hide()
    },
    deleteCol: function (index) {
      this.$delete(this.$data.formData.form_cols, index)
    },
    addColSelectList: function () {
      var colSize = Object.keys(this.$data.formData.form_cols[this.$data.inEditFormColIndex].select_list).length
      var tmp = {
        form_id: this.$data.formData.id,
        select_index: colSize,
        select_name: '選択項目' + colSize,
        select_value: colSize + '',
        is_default: false,
        view_style: 'display:inline',
        edit_style: 'display:none'
      }
      this.$set(this.$data.formData.form_cols[this.$data.inEditFormColIndex].select_list, colSize, tmp)
    },
    deleteColSelectList: function (index) {
      this.$delete(this.$data.formData.form_cols[this.$data.inEditFormColIndex].select_list, index)
    },
    editColSelectList: function (index) {
      const selectList = this.$data.formData.form_cols[this.$data.inEditFormColIndex].select_list
      for (var sel in selectList) {
        this.$set(selectList[sel], 'in_edit', selectList[sel].select_index === index)
      }
    },
    endEditColSelectList: function (index) {
      this.$set(this.$data.formData.form_cols[this.$data.inEditFormColIndex].select_list[index], 'in_edit', false)
    },
    reorderColStart: function () {
      this.$data.formColEditOrderModalState = 1
    },
    reorderColEnd: function (formCols) {
      this.$data.formColEditOrderModalState = 0
      this.$data.formData.form_cols = []
      for (var col in formCols) {
        this.$data.formData.form_cols[col] = formCols[col]
        this.$data.formData.form_cols[col].col_index = Number(col)
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
