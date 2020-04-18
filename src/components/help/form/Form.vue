<template>
  <div class="help-sub">
    <div class="container">
      <h2>
        フォームの作成と設置
      </h2>
      <help-form-list />
      <help-form-edit />
      <help-form-col-edit />
    </div>
  </div>
</template>
<script>
import FormList from './FormList.vue'
import FormEdit from './FormEdit.vue'
import FormColEdit from './FormColEdit.vue'
export default {
  name: 'Form',
  components: {
    helpFormList: FormList,
    helpFormEdit: FormEdit,
    helpFormColEdit: FormColEdit
  }
}
</script>
