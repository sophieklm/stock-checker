<template>
  <div class="home">
    <h1>Medicine Stock</h1>
    <Card>
      <span>
        filters
      </span>
    </Card>
    <Card>
      <span>
        <div v-for="item in stock" :key="item.id" :item="item" class="column">
          <StockList :item="item" />
        </div>
      </span>
    </Card>
  </div>
</template>

<style lang="stylus">
.home
  width: 100%
  padding: 200px 0
</style>

<script>
import axios from 'axios'
import Card from '~/components/Card.vue'
import StockList from '~/components/StockList.vue'
const API_URL = 'http://localhost:4000/stock/'

export default {
  name: 'Home',
  layout: 'default',
  components: {
    Card,
    StockList
  },
  data: () => ({
    error: '',
    stock: []
  }),
  mounted() {
    axios.get(API_URL).then((response) => {
      this.stock = response.data.data.stock
    })
  }
}
</script>
