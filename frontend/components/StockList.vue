<script>
export default {
  name: 'StockList',
  props: ['item']
}
</script>

<template>
  <div class="item-card">
    <div class="card">
      <div class="card-content">
        <h2>{{ item.name }}</h2>
        <small>{{ item.type }}</small>
        <span>{{ item.units_available }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.card
  background-color: #FFFCFA
  border-radius: 10px
  box-shadow: 0 4px 8px #E2E2E2
  padding: 28px 20px 20px 20px
</style>
