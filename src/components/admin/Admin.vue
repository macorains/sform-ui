<template>
  <div class="admin">
    <div class="container">
      <h1>Admin</h1>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="User" active>
            <userConfig v-bind:serverUri="serverUri"></userConfig>
          </b-tab>
          <b-tab title="Transfer">
            <transferConfig v-bind:serverUri="serverUri"></transferConfig>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserConfig from './users/UserConfig.vue'
import TransferConfig from './transfers/TransferConfig.vue'

export default {
  name: 'admin',
  props: ['serverUri'],
  components: {
    userConfig: UserConfig,
    transferConfig: TransferConfig
  }
}

</script>

<style scoped>
</style>
