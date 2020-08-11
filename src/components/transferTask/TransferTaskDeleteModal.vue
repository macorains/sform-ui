<template>
  <b-modal
    ref="tranferTaskDeleteModal"
    size="sm"
    :title="$t('message.confirm')"
    :visible="isVisible"
    @ok="deleteTransferTask"
    @hidden="closeTransferTaskDeleteModal"
  >
    <b-container class="text-left form-col-edit">
      {{ $t('message.delete_transfer_task') }}
    </b-container>
  </b-modal>
</template>
<script>
export default {
  name: 'TransferTaskDeleteModal',
  props: {
    index: {
      type: Number,
      default: 0
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteTransferTask: function () {
      this.$emit('transferTaskDelete', this.$props.index)
      this.closeTransferTaskDeleteModal()
    },
    closeTransferTaskDeleteModal: function () {
      this.$emit('transferTaskDeleteModalClose')
    }
  }
}
</script>
