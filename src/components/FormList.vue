<template>
  <div class="form_list">
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
        {{ $t("message.form_list") }}
      </h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              {{ $t("message.id") }}
            </th>
            <th scope="col">
              {{ $t("message.form_name") }}
            </th>
            <th scope="col">
              {{ $t("message.form_title") }}
            </th>
            <th scope="col">
              {{ $t("message.status") }}
            </th>
            <th scope="col">
              {{ $t("message.action") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in formList"
            :key="item.id"
          >
            <td scope="row">
              {{ item.hashed_id }}
            </td>
            <td scope="row">
              {{ item.name }}
            </td>
            <td scope="row">
              {{ item.title }}
            </td>
            <td scope="row">
              {{ formStatus[item.status] }}
            </td>
            <td scope="row">
              <b-button
                size="sm"
                @click="edit(item.hashed_id)"
              >
                <span
                  class="oi oi-pencil"
                  title="pencil"
                  aria-hidden="true"
                />
                {{ $t("message.edit") }}
              </b-button>
              <b-button
                size="sm"
                @click="dataView(item.hashed_id)"
              >
                <span
                  class="oi oi-list"
                  title="list"
                  aria-hidden="true"
                />
                {{ $t("message.data_view") }}
              </b-button>
              <b-button
                v-b-modal.modal_form_delete
                size="sm"
                @click="targetIndex = index"
              >
                <span
                  class="oi oi-trash"
                  title="trash"
                  aria-hidden="true"
                />
                {{ $t('message.delete') }}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button
        class="mt-4"
        @click="add"
      >
        <span
          class="oi oi-plus"
          title="plus"
          aria-hidden="true"
        />
        {{ $t("message.add_form") }}
      </b-button>
    </div>
    <b-modal
      id="modal_form_delete"
      :title="$t('message.confirm')"
      header-border-variant="light"
      footer-border-variant="light"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
      :hide-header-close="true"
      centered
      @ok="deleteForm(targetIndex)"
    >
      <p>
        {{ $t('message.confirm_form_delete') }}
      </p>
    </b-modal>
    <b-modal
      id="modal_form_add_complete"
      v-model="modalFormAddComplete"
      :title="$t('message.confirm')"
      ok-only
    >
      <p>
        {{ $t('message.add_form_complete') }} {{ addedFormName }}
      </p>
    </b-modal>
  </div>
</template>

<script>
import 'open-iconic/font/css/open-iconic-bootstrap.css'

export default {
  name: 'FormList',
  data: function () {
    return {
      formList: [],
      checkedColumn: [],
      formStatus: ['無効', '有効', '停止中'],
      config: {},
      loading: false,
      modalFormAddComplete: false,
      addedFormName: ''
    }
  },
  created: function () {
    this.$data.loading = true
    this.$http.get('/form/list')
      .then(response => {
        this.$data.loading = false
        this.$data.formList = response.data.forms
      })
  },
  methods: {
    edit: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({ name: 'formedit', params: { hashedFormId: hashedId } })
    },
    add: function () {
      if (typeof this.$data.formList === 'undefined') {
        this.$data.formList = []
      }
      const i = Object.keys(this.$data.formList).length
      this.$data.addedFormName = 'フォーム' + i
      const tmp = {
        form_index: i,
        id: null,
        hashed_id: '',
        status: 0,
        name: this.$data.addedFormName,
        title: this.$data.addedFormName,
        cancel_url: 'https://',
        complete_url: 'https://',
        input_header: '',
        confirm_header: '',
        complete_text: '',
        close_text: '',
        form_cols: [
          {
            col_index: 0,
            name: 'メールアドレス',
            col_id: 'email',
            col_type: 1,
            default_value: '',
            select_list: [],
            validations: {
              input_type: 5,
              min_value: '',
              max_value: '',
              min_length: '',
              max_length: '',
              required: true
            }
          }
        ],
        form_transfer_tasks: []
      }
      this.$data.loading = true
      this.$http.post('/form/new', tmp)
        .then(response => {
          // TODO この辺りは新規データをリストに入れる形ではなくて、リロードした方が良さそう
          this.$data.loading = false
          const data = response.data
          tmp.id = data.id
          tmp.hashed_id = data.hashed_id
          this.$data.modalFormAddComplete = true
          this.$set(this.$data.formList, i, tmp)
        })
    },
    deleteForm: function (index) {
      const form = this.$data.formList[index]
      this.$data.loading = true
      this.$http.delete('/form/' + form.hashed_id)
        .then(response => {
          this.$delete(this.$data.formList, index)
          this.$data.loading = false
        })
    },
    dataView: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({ name: 'dataview', params: { hashedFormId: hashedId } })
    }
  }
}
</script>

<style scoped>

</style>
