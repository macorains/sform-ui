<template>
  <div class="DataView">
    <div class="container">
      <h1 class="mt-5 mb-5">
        {{ $t('message.data_view') }}
      </h1>
      <div>
        <b-table
          class="overflow-auto"
          sticky-header
          responsive
          small
          head-variant="light"
          :items="formdata"
          :fields="headerLabel"
        />
      </div>
      <div>
        <b-btn
          block
          size="sm"
          @click="back"
        >
          <span
            class="oi oi-arrow-circle-left"
            title="arrow-circle-left"
            aria-hidden="true"
          />
          {{ $t('message.back') }}
        </b-btn>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    'serverUri': {
      type: String,
      default: ''
    },
    'hashedFormId': {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      tmpdata: {},
      formdata: [],
      headerLabel: []
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
    axios.get(this.$props.serverUri + '/formpost/' + this.$props.hashedFormId, this.$data.config)
      .then(response => {
        this.$data.formdata = response.data.rows
        this.$data.headerdata = response.data.cols
        var res = []
        for (let k in this.$data.headerdata) {
          res.push({key: this.$data.headerdata[k].colId, label: this.$data.headerdata[k].name})
        }
        this.$data.headerLabel = res
      })
  },
  methods: {
    back: function () {
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    }
  }
}
</script>
