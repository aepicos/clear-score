import Vue from 'vue'
import CreditScore from '@/components/CreditScore'

const scoreTestValue = 300
const maxScoreTestValue = 700

describe('CreditScore.vue', () => {
  it('MaxScore correctly displayed from prop', () => {
    const Constructor = Vue.extend(CreditScore)
    const vm = new Constructor({
      propsData: {
        score: {
          score: scoreTestValue,
          maxScoreValue: maxScoreTestValue
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('.credit-score--max-score').textContent)
      .to.equal('out of ' + maxScoreTestValue)
  })
})

describe('CreditScore.vue', () => {
  it('score should initially be 0', () => {
    const Constructor = Vue.extend(CreditScore)
    const vm = new Constructor({
      propsData: {
        score: {
          score: scoreTestValue,
          maxScoreValue: maxScoreTestValue
        }
      }
    }).$mount()
    expect(vm.$el.querySelector('.credit-score--score').textContent)
      .to.equal('0')
  })
})

// not having much luck here in deferring the check till the animation has run
/*
describe('CreditScore.vue', () => {
  it('score should change after 3s', (done) => {
    Vue.nextTick(() => {
      const Constructor = Vue.extend(CreditScore)
      const vm = new Constructor({
        propsData: {
          score: {
            score: scoreTestValue,
            maxScoreValue: maxScoreTestValue
          }
        }
      }).$mount()
      expect(vm.$el.querySelector('.credit-score--score').textContent).to.equal('a')
    })
  }).timeout(5000)
})
*/
