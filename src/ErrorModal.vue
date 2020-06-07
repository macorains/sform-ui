<template>
  <b-modal
    refs="error_modal"
    title="Error"
  >
    <p class="my-4">
      {{ errorMessage }}}
    </p>
  </b-modal>
</template>
<script>
export default {
  name: 'ErrorModal',
  props: {
    errorMessage: {
      type: String,
      default: 'Error!'
    }
  }
}
</script>
