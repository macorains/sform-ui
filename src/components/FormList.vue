<template>
  <div class="form_list">
    <div class="container">
    <h1 class="mt-5 mb-5">{{$t("message.form_list")}}</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">{{$t("message.id")}}</th>
          <th scope="col">{{$t("message.form_name")}}</th>
          <th scope="col">{{$t("message.form_title")}}</th>
          <th scope="col">{{$t("message.status")}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in formList" v-bind:key="item.id" v-on:click="edit(item.hashed_id)">
          <td scope="row">{{item.hashed_id}}</td>
          <td scope="row">{{item.name}}</td>
          <td scope="row">{{item.title}}</td>
          <td scope="row">{{item.status}}</td>
        </tr>
      </tbody>
    </table>
    <b-button class="mt-4" @click="add"><span class="oi oi-plus" title="plus" aria-hidden="true"></span>{{$t("message.add_form")}}</b-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import 'open-iconic/font/css/open-iconic-bootstrap.css'

export default {
  name: 'form_list',
  props: ['serverUri'],
  data: function () {
    return {
      formList: {},
      serverUriString: '',
      checkedColumn: []
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    if (!this.$props.serverUri) {
      this.$router.push({path: 'signin'})
    }
    this.$data.serverUriString = this.$props.serverUri
    let config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$data.serverUriString
      }
    }
    axios.get(this.$props.serverUri + 'form/list', config)
    .then(response => {
      console.log(response)
      this.$data.formList = JSON.parse(response.data.dataset)
    })
    .catch(error => {
      if (error.response) {
        var statusCode = error.response.status
        if (statusCode === 401 || statusCode === 403) {
          this.$router.push({path: 'signin'})
        } else {
          console.log(error.response)
        }
      }
    })
  },
  methods: {
    edit: function (hashedId) {
      this.$emit('updateHashedFormId', hashedId)
      this.$router.push({name: 'formedit', params: {hashedFormId: hashedId}})
    },
    add: function () {
      var i = Object.keys(this.$data.formlist).length
      var tmp = {
        index: i + '',
        id: '',
        status: '0',
        name: 'フォーム' + i,
        title: 'フォーム' + i,
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
      axios.post(this.$props.serverUri + 'form', reqdata, this.$data.config)
    }
  }
}
</script>


<style scoped>

</style>
