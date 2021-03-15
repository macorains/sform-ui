<template>
  <div class="form_col_edit">
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
              v-model="formData.form_cols[inEditFormColIndex].default_value"
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
</template>
<script>
import 'open-iconic/font/css/open-iconic-bootstrap.css'

export default {
  name: 'FormColEdit',
  props: {
    formColData: {
      type: Array,
      default: () => ([])
    },
    formColEditModalState: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      formCols: [],
      inColEdit: false
    }
  },
  watch: {
    formColEditModalState: function () {
      this.$props.formColEditModalState === 0 ? this.$refs.modalColEdit.hide() : this.$refs.modalColEdit.show()
    }
  }
}
</script>
