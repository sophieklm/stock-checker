<template>
  <tr :class="getClass(`${item.units_available}`)">
    <td class="capitalise">{{ styleString(item.name) }}</td>
    <td class="capitalise">{{ styleString(item.type) }}</td>
    <td>{{ styleUnitsAvailable(item.units_available) }}</td>
  </tr>
</template>

<script>
export default {
  name: 'StockList',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getClass(units) {
      if (parseInt(units) === 0) {
        this.class = 'bg-danger'
        return this.class
      }
    },
    styleUnitsAvailable(units) {
      return parseInt(units) === 0 ? 'Out of Stock' : units
    },
    styleString(string) {
      return string.replace(/_/g, ' ')
    }
  }
}
</script>

<style lang="stylus">
.capitalise
  text-transform: capitalize
</style>
