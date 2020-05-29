<template>
  <div class="home">
    <h1>Medicine Stock</h1>
    <Card>
      <div class="btn-group" role="group">
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
  padding: 200px 0

.filters
  display: inline;
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
