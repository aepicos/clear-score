<template>
  <div class="main-dial">
    <svg viewBox="0 0 300 300" class="main-dial--graph">
      <path  class="main-dial--graph-path" d="M150,6c78.5,0,144,65.5,144,144s-65.5,144-144,144S6,228.5,6,150 S71.5,6,150,6z" />
    </svg>
    <h1 class="main-dial--score">{{ creditInfo.score }}</h1>
    <h4 class="main-dial--max-score">out of {{ creditInfo.maxScoreValue }}</h4>
  </div>
</template>

<script>
export default {
  props: ['creditInfo'],

  watch: {
    creditInfo: function () {
      this.animateScoreGraph(this.creditInfo.score, this.creditInfo.maxScoreValue)
    }
  },

  methods: {

    /**
      @function invertEasing
      inverts the easing function passed
      i.e.: an easeIn function becomes an easeOut function
      @author https://github.com/iliakan
      @param {function} easing - the original easing function
    */
    invertEasing: function (easing) {
      return function (timeFraction) {
        return 1 - easing(1 - timeFraction)
      }
    },

    /**
      @function bounceEase
      an easing function that bounces in the beginning
      @author https://github.com/iliakan
      @param {number} timeFraction - the current point in time of the animation sequence
    */
    bounceEase: function (timeFraction) {
      for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
      }
    },

    /**
      @function quadEase
      an easing function following a parabolic curve
      @author https://github.com/iliakan
      @param {number} timeFraction - the current point in time of the animation sequence
    */
    quadEase: function (timeFraction) {
      return Math.pow(timeFraction, 2)
    },

    /**
      @function animate
      function controlling an animation
      @author https://github.com/iliakan
      @param {function} easing
      @param {function} draw - contains what should be animated
      @param {integer} duration - duration of the animation in milliseconds
    */
    animate: function ({easing, draw, duration}) {
      // get timestamp
      let start = performance.now()

      // recursive
      requestAnimationFrame(function animate (time) {
        // timeFraction is a decimal between 0 and 1
        // 1 is a completed animation cycle
        let timeFraction = (time - start) / duration

        if (timeFraction > 1) {
          timeFraction = 1
        }

        // get the current state of animation
        let progress = easing(timeFraction)

        // run the passed function with the current state
        draw(progress)

        // recur if animation cycle not over
        if (timeFraction < 1) {
          requestAnimationFrame(animate)
        }
      })
    },

    /**
      @function animateScoreGraph
      manages the bouncing animation of the circular graph
      @param {integer} creditScore - users current score
      @param {integer} creditMaxScore - the maximmum possible score used to calculate graph position
    */
    animateScoreGraph: function (creditScore, creditMaxScore) {
      const maxScore = creditMaxScore

      // reference the svg path that needs animation
      const path = document.querySelector('.main-dial--graph-path')

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

  .main-dial {
    @include flex-center(column);

    width: 80vmin;
    height: 80vmin;
    max-width: 400px;
    max-height: 400px;
    position: relative;
    z-index: 10;
    border-radius: 50%;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 50%;
    }

    &::before {
      @include fixed-background;
      z-index: -2;
      -webkit-filter: blur(10px);
              filter: blur(10px);
    }

    &::after {
      z-index: -1;
      background-color: rgba(white, 0.2);
      border: 1px solid rgba(white, 0.5);
    }

    &--graph {
      width: calc(100% - 0.6rem);
      height: calc(100% - 0.6rem);
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;

      &-path {
        fill: transparent;
        stroke: $_score_color;
        stroke: {
          linecap: round;
          width: 0.4rem;
        }
        opacity: 0;
      }
    }

    &--score {
      color: $_score_color;
      font: {
        size: 16vmin;
        weight: 100;
      }
      line-height: 1;
    }

    &--max-score {
      color: rgba($_score_color, 0.5);
    }
  }
</style>
