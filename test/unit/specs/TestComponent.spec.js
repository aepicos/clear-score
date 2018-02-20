import Vue from 'vue'
import TestComponent from '@/components/TestComponent'

describe('TestComponent.vue', () => {
  it('TestComponent should render "Testing: 1 2 3"', () => {
    const Constructor = Vue.extend(TestComponent)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.test-component h1').textContent)
      .to.equal('Testing: 1 2 3')
  })
})
