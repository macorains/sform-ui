<template>
  <div>
    Help
  </div>
</template>
<script>
export default {
  name: 'Help',
  props: {
    'contentId': {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      hashedFormId: '',
      isAdmin: false
    }
  }
}
</script>
