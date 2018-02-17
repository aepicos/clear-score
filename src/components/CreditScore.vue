<template>
  <header class="credit-score">
    <p class="credit-score--label">Your credit score is</p>
    <h1 class="credit-score--score">{{ num }}</h1>
    <h4 class="credit-score--max-score">out of {{ score.maxScoreValue }}</h4>
  </header>
</template>

<script>
import {animate} from '../mixins/animate'

export default {
  mixins: [animate],
  props: ['score'],

  data () {
    return {
      num: 0
    }
  },

  watch: {
    score: function () {
      this.animateScore(this.score.score)
    }
  },

  methods: {
    /**
      @function animateScore
      animates:
       - the score's value from 0 to score
       - the score's opacity from 0 to 1
      @param {integer} score - the users credit score
    */
    animateScore: function (score) {
      // reference the score element
      // because we will toggle the opacity
      let creditScore = document.querySelector('.credit-score--score')

      // keep track of this
      let self = this

      // animate number and opacity
      this.animate({
        duration: 3000,
        easing: this.invertEasing(this.arcEase),
        draw: function (progress) {
          // er ... not sure this is the kosher way of doing it
          // ... but it works
          self.$data.num = parseInt(progress * score)
          // progress is a floating point between 0 and 1
          creditScore.style['opacity'] = progress
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~scss/globals';

  .credit-score {
    @include flex-center(column);

    &--label {

    }

    &--score {
      color: $_score_color;
      font: {
        size: 16vmin;
        weight: 100;
      }
      line-height: 1;
      opacity: 0;
    }

    &--max-score {
      color: rgba($_score_color, 0.5);
    }
  }
</style>
