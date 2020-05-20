import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/Index.vue'

describe('Index', () => {
  it('renders a table', () => {
    const wrapper = shallowMount(Index, {
      data() {
        return {
          error: '',
          stock: [
            { id: '1', name: 'panadol', type: 'tablet', units_available: 34 }
          ]
        }
      }
    })
    expect(wrapper.find('table').isVisible()).toBe(true)
    expect(wrapper.find('table').text()).toContain('Name Type Units Available')
  })

  it('renders an error', () => {
    const wrapper = shallowMount(Index, {
      data() {
        return {
          error: 'An Error Occured',
          stock: []
        }
      }
    })

    expect(wrapper.find('.alert').isVisible()).toBe(true)
  })
})
