<template>
  <div class="form_col_edit_order">
    <b-modal ref="modalColReorder" hide-footer title="フォーム項目順序変更" @shown="modalInit">
      <draggable element="ul" v-model="formCols" class="list-group">
        <li v-for="item in formCols" v-bind:key="item.index" class="list-group-item">{{item.name}}</li>
      </draggable>
      <b-btn class="mt-3" block @click="closeFormColEditReorder">編集終了</b-btn>
    </b-modal>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
export default {
  name: 'form_col_edit_order',
  components: {
    'draggable': Draggable
  },
  props: ['formColData', 'formColEditOrderModalState'],
  data: function () {
    return {
      formCols: [],
      inColEdit: false
    }
  },
  methods: {
    closeFormColEditReorder: function () {
      this.$emit('reorderColEnd', this.$data.formCols)
      this.$data.formCols = []
    },
    modalInit: function () {
      for (var col in this.$props.formColData) {
        this.$data.formCols.splice(col, 0, this.$props.formColData[col])
      }
    }
  },
  watch: {
    formColEditOrderModalState: function () {
      this.$props.formColEditOrderModalState === 0 ? this.$refs.modalColReorder.hide() : this.$refs.modalColReorder.show()
    }
  }
}
</script>
    