<template>
  <div class="help">
    <div class="container">
      <h1 class="mt-5 mb-5">
        {{ $t('message.help') }}
      </h1>
      <b-container class="text-left">
        <help-about />
        <help-form />
        <help-transfer />
      </b-container>
    </div>
  </div>
</template>
<script>
import AboutSform from './AboutSform.vue'
import Form from './form/Form.vue'
import Transfer from './transfer/Transfer.vue'
export default {
  name: 'Help',
  components: {
    'helpAbout': AboutSform,
    'helpForm': Form,
    'helpTransfer': Transfer
  }
}
</script>
