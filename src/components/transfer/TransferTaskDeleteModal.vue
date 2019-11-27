<template>
  <b-modal
    ref="tranferTaskDeleteModal"
    size="sm"
    v-model="modalState"
    :title="$t('message.confirm')"
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
    transferTaskDeleteModalState: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      modalState: 0
    }
  },
  watch: {
    transferTaskDeleteModalState: function () {
      this.$props.transferTaskDeleteModalState === 0 ? this.$refs.tranferTaskDeleteModal.hide() : this.$refs.tranferTaskDeleteModal.show()
    }
  },
  methods: {
    deleteTransferTask: function () {
      this.$emit('transferDelete', this.$props.index)
      this.closeTransferTaskDeleteModal()
    },
    closeTransferTaskDeleteModal: function () {
      this.$emit('transferDeleteModalClose')
    }
  }
}
</script>
