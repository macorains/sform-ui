<template>
  <div class="form_col_edit">
    <b-modal
      ref="modalColEdit"
      :centered="true"
      size="xl"
      content-class="height:1000px"
      :title="$t('message.edit_form_item')"
      @shown="modalInit"
      @hide="endEditCol"
    >
      <b-container class="text-left form-col-edit">
        <b-row class="mb-3">
          <b-col cols="4">
            {{ $t('message.column_name') }}
          </b-col>
          <b-col>
            <b-form-input
              id="formColName"
              v-model="tmpFormCol.name"
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
              v-model="tmpFormCol.col_id"
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
              v-model="tmpFormCol.col_type"
              :options="optionFormColType"
              class="mb-3"
            />
          </b-col>
        </b-row>
        <b-row
          v-if="isSelectable()"
          class="mb-3"
        >
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
                  v-for="(item, index) in tmpFormCol.select_list"
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
              v-model="tmpFormCol.default_value"
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
              v-model="tmpFormCol.validations.input_type"
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
              v-model="tmpFormCol.validations.min_value"
              type="text"
            />
          </b-col>
          <b-col cols="1">
            ～
          </b-col>
          <b-col cols="2">
            <b-form-input
              id="formColValidationMaxValue"
              v-model="tmpFormCol.validations.max_value"
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
              v-model="tmpFormCol.validations.min_length"
              type="text"
            />
          </b-col>
          <b-col cols="1">
            ～
          </b-col>
          <b-col cols="2">
            <b-form-input
              id="formColValidationMaxLength"
              v-model="tmpFormCol.validations.max_length"
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
              v-model="tmpFormCol.validations.required"
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
</template>
<script>
import 'open-iconic/font/css/open-iconic-bootstrap.css'

export default {
  name: 'FormColEdit',
  props: {
    formColEditModalState: {
      type: Number,
      default: 0
    },
    formColData: {
      type: Object,
      default: () => ({})
    },
    formId: {
      type: Number,
      default: null
    }
  },
  data: function () {
    return {
      tmpFormCol: {
        validations: {},
        select_list: []
      },
      formCols: [],
      inColEdit: false,
      inEditFormColIndex: 0,
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
        { value: 1, text: 'テキスト', select_list: false },
        { value: 2, text: 'コンボボックス（単一選択）', select_list: true },
        { value: 3, text: 'チェックボックス（複数選択）', select_list: true },
        { value: 4, text: 'ラジオボタン（単一選択）', select_list: true },
        { value: 5, text: 'テキストエリア', select_list: false },
        { value: 6, text: '隠しテキスト', select_list: false },
        { value: 7, text: '表示テキスト（非入力項目）', select_list: false }
      ]
    }
  },
  watch: {
    formColEditModalState: function () {
      this.$props.formColEditModalState === 0 ? this.$refs.modalColEdit.hide() : this.$refs.modalColEdit.show()
    }
  },
  methods: {
    modalInit: function () {
      this.$data.tmpFormCol = JSON.parse(JSON.stringify(this.$props.formColData))
    },
    addColSelectList: function () {
      var colSize = Object.keys(this.$data.tmpFormCol.select_list).length
      var tmp = {
        form_id: this.$props.formId,
        select_index: colSize,
        select_name: '選択項目' + colSize,
        select_value: colSize + '',
        is_default: false,
        view_style: 'display:inline',
        edit_style: 'display:none'
      }
      this.$set(this.$data.tmpFormCol.select_list, colSize, tmp)
    },
    editColSelectList: function (index) {
      const selectList = this.$data.tmpFormCol.select_list
      for (var sel in selectList) {
        this.$set(selectList[sel], 'in_edit', selectList[sel].select_index === index)
      }
    },
    endEditColSelectList: function (index) {
      this.$set(this.$data.tmpFormCol.select_list[index], 'in_edit', false)
    },
    endEditCol: function () {
      this.$emit('endEditCol', this.$data.tmpFormCol)
    },
    isSelectable: function () {
      const selectedColType = this.$data.optionFormColType.filter(ct => Number(ct.value) === Number(this.$data.tmpFormCol.col_type))
      if (selectedColType.length) {
        return selectedColType[0].select_list
      }
      return false
    }
  }
}
</script>
