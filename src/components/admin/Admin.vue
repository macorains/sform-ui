<template>
  <div class="admin">
    <div class="container">
      <h1 class="mt-5 mb-5">
        {{ $t('message.admin') }}
      </h1>
      <b-card no-body>
        <b-tabs
          pills
          card
        >
          <b-tab active>
            <template slot="title">
              <span
                class="oi oi-transfer"
                title="transfer"
                aria-hidden="true"
              />
              {{ $t('message.transfer') }}
            </template>
            <transferConfig :server-uri="serverUri" />
          </b-tab>
          <b-tab>
            <template slot="title">
              <span
                class="oi oi-person"
                title="person"
                aria-hidden="true"
              />
              {{ $t('message.user') }}
            </template>
            <userConfig :server-uri="serverUri" />
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
  name: 'Admin',
  components: {
    userConfig: UserConfig,
    transferConfig: TransferConfig
  }
}

</script>

<style scoped>
</style>
