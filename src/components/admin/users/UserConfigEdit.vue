<template>
  <div class="userConfigEdit">
    <b-modal ref="modalUserConfigEdit" hide-footer title="ユーザー情報変更" @shown="modalInit">
      <b-container class="text-left">
        <b-form-row>
          <b-col>
            <b-form-group id="userNameGroup" label-for="userName" :label="$t('message.name')">
              <b-form-input id="userName" type="text" v-model="userData.name"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-container>
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
      userData: this.$props.user
    }
  },
  created: function () {
  },
  methods: {
    modalInit: function () {
      return true
    }
  },
  watch: {
    modalState: function () {
      this.$props.modalState === 0 ? this.$refs.modalUserConfigEdit.hide() : this.$refs.modalUserConfigEdit.show()
    }
  }
}
</script>