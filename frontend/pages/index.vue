<script>
import Card from '~/components/Card.vue'

export default {
  layout: 'default',
  components: {
    Card
  }
}
</script>

<template lang="pug">
  .home
    h1 Medicine Stock
    Card
      span filters
    Card
      span table
</template>

<style lang="stylus">
.home
  width: 100%
  padding: 200px 0
</style>
