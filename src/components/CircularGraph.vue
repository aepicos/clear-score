<template>
  <svg viewBox="0 0 300 300" class="circular-graph">
    <path  class="circular-graph--path" d="M150,6c78.5,0,144,65.5,144,144s-65.5,144-144,144S6,228.5,6,150 S71.5,6,150,6z" />
  </svg>
</template>

<script>
import {animate} from '../mixins/animate'

export default {
  mixins: [animate],
  props: ['score'],

  watch: {
    score: function () {
      this.animateScoreGraph(this.score.score, this.score.maxScoreValue)
    }
  },

  methods: {

    /**
      @function animateScoreGraph
      manages the bouncing animation of the circular graph
      @param {integer} creditScore - users current score
      @param {integer} creditMaxScore - the maximmum possible score used to calculate graph position
    */
    animateScoreGraph: function (creditScore, creditMaxScore) {
      const maxScore = creditMaxScore

      // reference the svg path that needs animation
      const path = document.querySelector('.circular-graph--path')

      // get the length of the path for calculation
      // (the length of the path is constant
      //  as it is based on the svg viewBox
      //  not the actual size of the svg)
      const pathCircumference = path.getTotalLength()

      let score = creditScore

      // calculated length of path eqiuvalent to score/maxScore
      let pathScore = (pathCircumference / maxScore) * score

      // properties that will be animated
      path.style['opacity'] = 0

      // we will animate the stroke-dasharray property to simulate the growing path
      // stroke-dasharray is used to create dashed lines in the path stroke
      // (e.g.:
      //    stroke-dasharray: 10 4;
      //    will give a dash of 10 and a gap of 4)
      path.style['strokeDasharray'] = '0 ' + pathCircumference

      // stroke-dasharray animation
      this.animate({
        duration: 3200,

        // bounceEase starts with the bounce so we have to invert it
        easing: this.invertEasing(this.bounceEase),
        draw: function (progress) {
          // progress is a floating point between 0 and 1
          path.style['strokeDasharray'] = (progress * pathScore) + ' ' + pathCircumference
        }
      })

      // opacity animation
      this.animate({
        duration: 1000,
        easing: this.quadEase,
        draw: function (progress) {
          path.style['opacity'] = progress * 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~scss/globals';

  .circular-graph {
    width: calc(100% - 0.6rem);
    height: calc(100% - 0.6rem);
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;

    &--path {
      fill: transparent;
      stroke: $_score_color;
      stroke: {
        linecap: round;
        width: 0.4rem;
      }
      opacity: 0;
    }
  }
</style>
