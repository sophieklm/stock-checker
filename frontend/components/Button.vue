<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<template lang="pug">
  .button
    button {{text}}
</template>

<style scoped lang="stylus">
.button
  padding: 20px
</style>
