import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Button, {
      propsData: {
        text: 'button'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
