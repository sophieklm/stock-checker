<script>
import Card from '~/components/Card.vue'
import Button from '~/components/Button.vue'

export default {
  layout: 'default',
  components: {
    Button,
    Card
  }
}
</script>

<template lang="pug">
  .home
    Card
      h1 Fetch data
      Button(text='Fetch')
</template>

<style lang="stylus">
.home
  width: 100%
  padding: 200px 0
</style>
