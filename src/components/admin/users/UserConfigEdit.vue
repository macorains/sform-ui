<template>
  <div class="userConfigEdit">
    <b-modal ref="modalUserConfigEdit" title="ユーザー情報変更" :hide-header-close="true" @shown="modalInit" @hide="endEdit">
      <b-container class="text-left">
        <b-form-row>
          <b-col>
            <b-form-group id="lastNameGroup" label-for="lastName" :label="$t('message.last_name')">
              <b-form-input id="lastName" type="text" v-model="userData.lastName"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="firstNameGroup" label-for="firstName" :label="$t('message.first_name')">
              <b-form-input id="firstName" type="text" v-model="userData.firstName"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group id="emailGroup" label-for="email" :label="$t('message.email')">
              <b-form-input id="email" type="text" v-model="userData.email"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group id="roleGroup" label-for="role" :label="$t('message.role')">
              <b-form-radio-group id="role" v-model="userData.role" :options="roleOptions" name="role">
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-col>
          <b-btn class="mt-3" block @click="endEdit">
            <span class="oi oi-check" title="check" aria-hidden="true"></span>{{$t('message.end_edit')}}
          </b-btn>
        </b-col>
      </div>
    </b-modal>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  name: 'user-config-edit',
  props: ['serverUri', 'user', 'modalState'],
  data: function () {
    return {
      config: {},
      userData: this.$props.user,
      roleOptions: [
        {text: '一般', value: 'operator'},
        {text: '管理者', value: 'admin'}
      ]
    }
  },
  created: function () {
  },
  methods: {
    modalInit: function () {
      this.$set(this.$data, 'userData', this.$props.user)
      return true
    },
    endEdit: function () {
      this.$emit('endEditUser')
    }
  },
  watch: {
    modalState: function () {
      this.$props.modalState === 0 ? this.$refs.modalUserConfigEdit.hide() : this.$refs.modalUserConfigEdit.show()
    }
  }
}
</script>