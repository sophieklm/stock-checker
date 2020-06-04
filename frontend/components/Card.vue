<template lang="pug">
  .card
    slot
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped lang="stylus">
.card
  background-color: #FFFCFA
  border-radius: 10px
  box-shadow: 0 4px 8px #E2E2E2
  padding: 28px 20px 20px 20px
</style>
