<template>
  <div class="user-config-edit">
    <b-modal
      ref="modalUserConfigEdit"
      title="ユーザー情報変更"
      :hide-header-close="true"
      @shown="modalInit"
      @hide="endEdit"
    >
      <b-container class="text-left">
        <b-form-row>
          <b-col>
            <b-form-group
              id="lastNameGroup"
              label-for="lastName"
              :label="$t('message.last_name')"
            >
              <b-form-input
                id="lastName"
                v-model="userData.last_name"
                type="text"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="firstNameGroup"
              label-for="firstName"
              :label="$t('message.first_name')"
            >
              <b-form-input
                id="firstName"
                v-model="userData.first_name"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group
              id="emailGroup"
              label-for="email"
              :label="$t('message.email')"
            >
              <b-form-input
                id="email"
                v-model="userData.email"
                type="text"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group
              id="roleGroup"
              label-for="role"
              :label="$t('message.role')"
            >
              <b-form-radio-group
                id="role"
                v-model="userData.role"
                :options="roleOptions"
                name="role"
              />
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-container>
      <div
        slot="modal-footer"
        class="w-100"
      >
        <b-col>
          <b-btn
            class="mt-6"
            @click="endEdit"
          >
            <span
              class="oi oi-check"
              title="check"
              aria-hidden="true"
            />
            {{ $t('message.discard_edit') }}
          </b-btn>
          <b-btn
            class="mt-6"
            @click="saveEdit"
          >
            <span
              class="oi oi-check"
              title="check"
              aria-hidden="true"
            />
            {{ $t('message.save_change') }}
          </b-btn>
        </b-col>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: 'UserConfigEdit',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    modalState: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      config: {},
      userData: this.$props.user,
      roleOptions: [
        { text: '一般', value: 'operator' },
        { text: '管理者', value: 'admin' }
      ]
    }
  },
  watch: {
    modalState: function () {
      this.$props.modalState === 0 ? this.$refs.modalUserConfigEdit.hide() : this.$refs.modalUserConfigEdit.show()
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
    },
    saveEdit: function () {
      this.$emit('saveEditUser')
    }
  }
}
</script>
