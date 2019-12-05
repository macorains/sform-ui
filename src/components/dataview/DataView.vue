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
          :fields="dataheader"
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
      dataheader: [
        'col0',
        'col1',
        'col2'
      ],
      formdata: [
        {'col0': 'テスト株式会社1', 'col1': '試験監督1', 'col2': 'mmm1@macolabo.net'},
        {'col0': 'テスト株式会社2', 'col1': '試験監督2', 'col2': 'mmm2@macolabo.net'},
        {'col0': 'テスト株式会社3', 'col1': '試験監督3', 'col2': 'mmm3@macolabo.net'},
        {'col0': 'テスト株式会社4', 'col1': '試験監督4', 'col2': 'mmm4@macolabo.net'},
        {'col0': 'テスト株式会社5', 'col1': '試験監督5', 'col2': 'mmm5@macolabo.net'},
        {'col0': 'テスト株式会社6', 'col1': '試験監督6', 'col2': 'mmm6@macolabo.net'},
        {'col0': 'テスト株式会社7', 'col1': '試験監督7', 'col2': 'mmm7@macolabo.net'},
        {'col0': 'テスト株式会社8', 'col1': '試験監督8', 'col2': 'mmm8@macolabo.net'},
        {'col0': 'テスト株式会社9', 'col1': '試験監督9', 'col2': 'mmm9@macolabo.net'},
        {'col0': 'テスト株式会社10', 'col1': '試験監督10', 'col2': 'mmm10@macolabo.net'}
      ]
    }
  },
  methods: {
    back: function () {
      this.$router.push({path: 'formlist', params: {'serverUri': this.$props.serverUri}})
    }
  }
}
</script>
