<template>
  <div class="home">
    <h1 class="text-center">Stock Checker</h1>
    <Card>
      <h4>Filter:</h4>
      <div class="btn-group input-group" role="group">
        <div v-for="(filter, i) in getFilters" :key="i">
          <button
            type="button"
            class="btn btn-light"
            @click="setFilter(filter)"
          >
            {{ filter }}
          </button>
        </div>
        <div v-if="filter">
          <button class="btn btn-danger" @click="removeFilters()">x</button>
        </div>
      </div>
    </Card>
    <Card>
      <span>
        <div v-if="error" class="alert alert-warning">{{ error }}</div>
        <table v-else class="table">
          <thead>
            <tr>
              <th scope="col">
                <button class="btn btn-light" @click="invertSort()">
                  Name
                </button>
              </th>
              <th scope="col">Type</th>
              <th scope="col">Units Available</th>
            </tr>
          </thead>
          <tbody v-for="(item, i) in filteredData" :key="i">
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
  padding: 20px 0
</style>

<script>
import socket from '~/plugins/socket.io.js'
import Card from '~/components/Card.vue'
import StockList from '~/components/StockList.vue'
// const API_URL = `${process.env.API_URL}/stock`

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
    filter: null,
    sortAsc: true
  }),
  computed: {
    sortedData() {
      const result = this.stock
      const ascDesc = this.sortAsc ? 1 : -1
      return result.sort((a, b) => ascDesc * a.name.localeCompare(b.name))
    },
    filteredData() {
      if (!this.filter) {
        return this.stock
      }
      return this.stock.filter((item) => {
        return item.type.includes(this.filter)
      })
    },
    getFilters() {
      return [...new Set(this.stock.map((item) => item.type))]
    }
  },
  mounted() {
    // Get cached data.
    this.getData()

    // Listen for new data.
    this.error = 'Loading...'
    socket.emit('getStock')
    socket.on('gotStock', (stock) => {
      this.error = ''
      this.stock = stock
    })
    socket.on('err', (error) => {
      this.error = error + `: Try refreshing.`
    })
  },
  methods: {
    getData() {
      this.$axios
        .get('/stock')
        .then((response) => {
          if (response.data.status !== 200) {
            this.error = response.data.message
          }
          this.error = ''
          this.stock = response.data
        })
        .catch((e) => {
          this.error = `Unable to retrieve stock cache. ` + e.message
        })
    },
    invertSort() {
      this.sortAsc = !this.sortAsc
    },
    setFilter(filter) {
      this.filter = filter
    },
    removeFilters() {
      this.filter = null
    }
  }
}
</script>
