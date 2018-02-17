import Vue from 'vue'
import CreditScore from '@/components/CreditScore'

describe('CreditScore.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(CreditScore)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.credit-score--label').textContent)
      .to.equal('Your credit score is')
  })
})
