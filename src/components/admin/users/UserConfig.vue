<template>
  <div class="userConfig">
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>{{ $t('message.name') }}</th>
            <th>{{ $t('message.email') }}</th>
            <th>{{ $t('message.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user,index) in userlist"
            :key="index"
          >
            <td>{{ index+1 }}</td>
            <td>{{ user.last_name + ' ' + user.first_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <b-btn
                v-show="user.deletable"
                v-b-modal.modal_user_delete
                size="sm"
                @click="targetIndex = index"
              >
                <span
                  class="oi oi-trash"
                  title="trash"
                  aria-hidden="true"
                />
                {{ $t('message.delete') }}
              </b-btn>
              <b-btn
                size="sm"
                @click="editUser(index)"
              >
                <span
                  class="oi oi-x"
                  title="x"
                  aria-hidden="true"
                />
                {{ $t('message.edit') }}
              </b-btn>
              <b-btn
                v-b-modal.modal_user_reset_password
                size="sm"
              >
                <span
                  class="oi oi-reload"
                  title="reload"
                  aria-hidden="true"
                />
                {{ $t('message.reset_password') }}
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <b-row>
        <b-col>
          <b-btn
            class="mt-4"
            @click="addUser"
          >
            <span
              class="oi oi-plus"
              title="plus"
              aria-hidden="true"
            />
            {{ $t("message.add_user") }}
          </b-btn>
        </b-col>
      </b-row>
    </div>
    <userConfigEdit
      :server-uri="serverUri"
      :user="selectedUser"
      :modal-state="modalState"
      @endEditUser="endEditUser"
      @saveEditUser="saveEditUser"
    />
    <b-modal
      id="modal_user_delete"
      :title="$t('message.confirm')"
      header-border-variant="light"
      footer-border-variant="light"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
      :hide-header-close="true"
      centered
      @ok="deleteUser(targetIndex)"
    >
      <p>{{ $t('message.confirm_user_delete') }}</p>
    </b-modal>
    <b-modal
      id="modal_user_reset_password"
      :title="$t('message.confirm')"
      header-border-variant="light"
      footer-border-variant="light"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
      :hide-header-close="true"
      centered
    >
      <p>{{ $t('message.confirm_reset_password') }}</p>
    </b-modal>
  </div>
</template>

<script>
import UserConfigEdit from './UserConfigEdit.vue'

export default {
  name: 'UserConfig',
  components: {
    UserConfigEdit: UserConfigEdit
  },
  data: function () {
    return {
      config: {},
      userlist: [],
      selectedUser: {},
      modalState: 0,
      targerIndex: ''
    }
  },
  created: function () {
    this.load()
  },
  methods: {
    load: function () {
      this.$http.get('/user')
        .then(response => {
          this.$set(this.$data, 'userlist', response.data.dataset)
        })
    },
    editUser: function (index) {
      this.$set(this.$data, 'selectedUser', JSON.parse(JSON.stringify(this.$data.userlist[index])))
      this.$data.modalState = 1
    },
    deleteUser: function (index) {
      this.$http.delete('/user/' + this.$data.userlist[index].user_id)
        .then(response => {
          this.load()
        })
    },
    endEditUser: function () {
      this.$data.modalState = 0
      this.$data.selectedUser = {}
    },
    saveEditUser: function () {
      this.$http.post('/user', this.$data.selectedUser)
        .then(response => {
          this.load()
          this.endEditUser()
        })
    },
    addUser: function () {
      var tmp = {
        user_id: null,
        user_group: '',
        role: '',
        first_name: '',
        last_name: '',
        full_name: '',
        email: '',
        avatar_url: ''
      }
      this.$set(this.$data, 'selectedUser', JSON.parse(JSON.stringify(tmp)))
      this.$data.modalState = 1
    }
  }
}
</script>

<style scoped>
</style>
