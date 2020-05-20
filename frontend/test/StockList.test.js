import { shallowMount } from '@vue/test-utils'
import StockList from '@/components/StockList.vue'

describe('Index', () => {
  it('renders a stock item', () => {
    const item = {
      id: '1',
      name: 'panadol',
      type: 'tablet',
      units_available: 34
    }
    const wrapper = shallowMount(StockList, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('td').isVisible()).toBe(true)
    expect(wrapper.find('td').text()).toContain('panadol')
  })

  it('renders correctly when an item is out of stock', () => {
    const item = {
      id: '1',
      name: 'panadol',
      type: 'tablet',
      units_available: 0
    }
    const wrapper = shallowMount(StockList, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('.bg-danger').isVisible()).toBe(true)
  })
})
