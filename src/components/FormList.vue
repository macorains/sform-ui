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
// import axios from 'axios'
import 'open-iconic/font/css/open-iconic-bootstrap.css'

export default {
  name: 'FormList',
  props: {
    'serverUri': {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      formList: {},
      serverUriString: '',
      checkedColumn: [],
      formStatus: ['無効', '有効', '停止中'],
      config: {},
      loading: false,
      modalFormAddComplete: false,
      addedFormName: ''
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    if (!this.$props.serverUri) {
      this.$router.push({path: 'signin'})
    }
    this.$data.serverUriString = this.$props.serverUri
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        'timeout': 3000
      }
    }
    this.$data.loading = true
    this.$http.get(this.$props.serverUri + '/form/list', this.$data.config)
      .then(response => {
        this.$data.loading = false
        this.$data.formList = JSON.parse(response.data.dataset)
      })
  },
  methods: {
    edit: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({name: 'formedit', params: {hashedFormId: hashedId, serverUri: this.$props.serverUri}})
    },
    add: function () {
      var i = Object.keys(this.$data.formList).length
      this.$data.addedFormName = 'フォーム' + i
      var tmp = {
        index: i + '',
        id: '',
        status: '0',
        name: this.$data.addedFormName,
        title: this.$data.addedFormName,
        extLink1: false,
        cancelUrl: '',
        completeUrl: '',
        inputHeader: '',
        confirmHeader: '',
        completeText: '',
        closeText: '',
        replymailFrom: '',
        replymailSubject: '',
        replymailText: '',
        noticemailSend: '',
        noticemailText: '',
        formCols: {
          0: {
            index: '0',
            name: 'メールアドレス',
            colId: 'email',
            coltype: '1',
            default: '',
            validations: {
              inputType: '5',
              minValue: '0',
              maxValue: '0',
              minLength: '0',
              maxLength: '0',
              required: true
            }
          }
        }
      }
      var reqdata = {
        objtype: 'Form',
        action: 'create',
        rcdata: {formDef: tmp, transferTasks: {}}
      }
      this.$data.loading = true
      this.$http.post(this.$props.serverUri + '/form', reqdata, this.$data.config)
        .then(response => {
          this.$data.loading = false
          var data = response.data.dataset
          tmp.id = data.id
          tmp.hashed_id = data.hashed_id
          this.$data.modalFormAddComplete = true
          this.$set(this.$data.formList, i, tmp)
        })
    },
    deleteForm: function (index) {
      var form = this.$data.formList[index]
      this.$data.loading = true
      this.$http.delete(this.$props.serverUri + '/form/' + form.hashed_id, this.$data.config)
        .then(response => {
          this.$delete(this.$data.formList, index)
          this.$data.loading = false
        })
    },
    dataView: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({name: 'dataview', params: {hashedFormId: hashedId, serverUri: this.$props.serverUri}})
    }
  }
}
</script>

<style scoped>

</style>
