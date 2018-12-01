<template>
  <div class="salesforce-transfer-edit">
    <b-modal size="lg" ref="modalSalesforceTransferRuleSetting" hide-footer title="SalesforceTransfer設定">
      <!-- 転送ルール名　SFオブジェクト（リスト）　項目割付（SForm項目、SF項目）と追加・削除ボタン -->
      <b-container class="text-left">
        <b-row class="mb-3">
          <b-col cols="4">転送タスク名</b-col>
          <b-col><b-form-input id="transferTask.name" type="text" v-model="transferTask.name"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">転送先Salesforceオブジェクト</b-col>
          <b-col><b-form-input id="transferTask.config.sfObject" type="text" v-model="transferTask.config.sfObjectname"></b-form-input></b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4">項目割付</b-col>
          <b-col>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">表示文字列</th>
                  <th scope="col">値</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in transferConfig" v-bind:key="item.index">
                  <th scope="row">{{item.index}}</th>
                  <td>{{item.displayText}}</td>
                  <td>{{item.value}}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  name: 'salesforce-transfer-edit',
  props: ['serverUri', 'hashedFormId', 'transferEditModalState'],
  data: function () {
    return {
      transferTask: {
        name: '',
        config: {}
      },
      transferConfig: {}
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
    // axios.get(this.$props.serverUri + 'transfer/config/Salesforce', this.$data.config)
    // .then(response => {
      // console.log(this.$data)
      // this.$refs.modalSalesforceTransferRuleSetting.show()
    // })
    // .catch(function (error) {
      // console.log(error.text)
      // this.$router.push({name: 'signin'})
    // })
  },
  methods: {},
  watch: {
    transferEditModalState: function () {
      this.$props.transferEditModalState === 0 ? this.$refs.modalSalesforceTransferRuleSetting.hide() : this.$refs.modalSalesforceTransferRuleSetting.show()
    }
  }
}
</script>