<template>
  <div class="help-sub">
    <div class="container">
      <h2>
        フォームの作成と設置
      </h2>
      <help-form-list />
    </div>
  </div>
</template>
<script>
import FormList from './FormList.vue'
export default {
  name: 'Form',
  components: {
    'helpFormList': FormList
  }
}
</script>
