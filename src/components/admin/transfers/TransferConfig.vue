<template>
  <div class="transferConfig">
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">
              No.
            </th>
            <th scope="col">
              {{ $t('message.transfer_config_name') }}
            </th>
            <th scope="col">
              {{ $t('message.status') }}
            </th>
            <th scope="col">
              {{ $t('message.transfer_type') }}
            </th>
            <th scope="col">
              {{ $t('message.action') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in transferConfigList"
            :key="item.config_index"
          >
            <th scope="row">
              {{ Number(item.config_index) + 1 }}
            </th>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.status }}
            </td>
            <td>
              {{ item.type_code }}
            </td>
            <td>
              <b-btn
                size="sm"
                @click="edit(item.config_index)"
              >
                <span
                  class="oi oi-pencil"
                  title="pencil"
                  aria-hidden="true"
                />
                {{ $t('message.edit') }}
              </b-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TransferConfig',
  props: {
    serverUri: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      transferConfigList: []
    }
  },
  created: function () {
    var token = localStorage.getItem('sformToken')
    this.$data.config = {
      headers: {
        'x-Requested-With': '*',
        'X-Auth-Token': token,
        'Access-Control-Allow-Origin': this.$props.serverUri,
        timeout: 3000
      }
    }
    this.$http.get(this.$props.serverUri + '/transfer/config/list', this.$data.config)
      .then(response => {
        this.$data.transferConfigList = response.data
      })
  },
  methods: {
    edit: function (index) {
      this.$http.get(this.$props.serverUri + '/transfer/config/' + this.$data.transferConfigList[index].id, this.$data.config)
        .then(response => {
          console.log(response.data)
        })
    }

  }
}
</script>

<style scoped>
</style>
