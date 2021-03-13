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
    hashedFormId: {
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
    axios.get('/formpost/' + this.$props.hashedFormId)
      .then(response => {
        this.$data.formdata = response.data.rows
        this.$data.headerdata = response.data.cols
        var res = []
        for (const k in this.$data.headerdata) {
          res.push({ key: this.$data.headerdata[k].colId, label: this.$data.headerdata[k].name })
        }
        this.$data.headerLabel = res
      })
  },
  methods: {
    back: function () {
      this.$router.push({ path: 'formlist', params: { serverUri: this.$props.serverUri } })
    }
  }
}
</script>
