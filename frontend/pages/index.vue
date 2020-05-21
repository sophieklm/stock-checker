<template>
  <div class="home">
    <h1>Medicine Stock</h1>
    <Card />
    <Card>
      <span>
        <div v-if="error" class="alert alert-warning">{{ error }}</div>
        <table v-else class="table">
          <thead>
            <tr>
              <th scope="col">
                <button class="ui button" @click="invertSort()">Name</button>
              </th>
              <th scope="col">Type</th>
              <th scope="col">Units Available</th>
            </tr>
          </thead>
          <tbody v-for="(item, i) in sortedData" :key="i">
            <StockList :item="item" />
          </tbody>
        </table>
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
    stock: [],
    sortAsc: true
  }),
  computed: {
    sortedData() {
      const result = this.stock
      const ascDesc = this.sortAsc ? 1 : -1
      return result.sort((a, b) => ascDesc * a.name.localeCompare(b.name))
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios
        .get(API_URL)
        .then((response) => {
          if (response.data.status !== 200) {
            this.error = response.data.message
          }
          this.error = ''
          this.stock = response.data.stock
        })
        .catch((e) => {
          this.error = 'There was a problem fetching the data, try refreshing.'
        })
    },
    invertSort() {
      this.sortAsc = !this.sortAsc
    }
  }
}
</script>
