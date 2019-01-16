<template>
  <div class="userConfig">
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>{{$t('message.name')}}</th>
            <th>{{$t('message.email')}}</th>
            <th>{{$t('message.action')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in userlist" v-bind:key="index">
            <td>{{index+1}}</td>
            <td>{{user.lastName + ' ' + user.firstName}}</td>
            <td>{{user.email}}</td>
            <td>
              <b-btn v-b-modal.modal_user_delete size="sm">
                <span class="oi oi-trash" title="trash" aria-hidden="true"></span>{{$t('message.delete')}}
              </b-btn>
              <b-btn @click="editUser(userlist.index)" size="sm">
                <span class="oi oi-x" title="x" aria-hidden="true"></span>{{$t('message.edit')}}
              </b-btn>
              <b-btn v-b-modal.modal_user_reset_password size="sm">
                <span class="oi oi-reload" title="reload" aria-hidden="true"></span>{{$t('message.reset_password')}}
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <userConfigEdit :serverUri = "serverUri" :user = "selectedUser" :modalState = "modalState" @endEditUser="endEditUser"></userConfigEdit>
    <b-modal 
      id="modal_user_delete" 
      :title="$t('message.confirm')" 
      header-border-variant="light" 
      footer-border-variant="light"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
      :hide-header-close="true"
      centered>
      <p>{{$t('message.confirm_user_delete')}}</p>
    </b-modal>
    <b-modal 
      id="modal_user_reset_password" 
      :title="$t('message.confirm')" 
      header-border-variant="light" 
      footer-border-variant="light"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
      :hide-header-close="true"
      centered>
      <p>{{$t('message.confirm_reset_password')}}</p>
    </b-modal>
  </div>

</template>

<script>
import axios from 'axios'
import UserConfigEdit from './UserConfigEdit.vue'

export default {
  name: 'user-config',
  components: {
    UserConfigEdit: UserConfigEdit
  },
  props: ['serverUri'],
  data: function () {
    return {
      config: {},
      userlist: [],
      selectedUser: {},
      modalState: 0
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
    axios.get(this.$props.serverUri + 'user', this.$data.config)
    .then(response => {
      console.log(response.data)
      this.$data.userlist = response.data.dataset
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
    editUser: function (index) {
      this.$data.modalState = 1
      return index
    },
    deleteUser: function (index) {
      return index
    },
    endEditUser: function () {
      this.$data.modalState = 0
    }
  }
}
</script>

<style scoped>
</style>

