/* jshint esversion: 6 */

export const animate = {

  methods: {

    /**
      @function invertEasing
      inverts the easing function passed
      i.e.: an easeIn function becomes an easeOut function
      @author https://github.com/iliakan
      @param {function} easing - the original easing function
      @returns {number} - an inverted animation progress state
    */
    invertEasing: function (easing) {
      return function (timeFraction) {
        return 1 - easing(1 - timeFraction)
      }
    },

    /**
      @function arcEase
      an easing function following a circular arc
      @author https://github.com/iliakan
      @param {number} timeFraction - the current point in time of the animation sequence
      @returns {number} - animation progress state
    */
    arcEase: function (timeFraction) {
      return 1 - Math.sin(Math.acos(timeFraction));
    },

    /**
      @function bounceEase
      an easing function that bounces in the beginning
      @author https://github.com/iliakan
      @param {number} timeFraction - the current point in time of the animation sequence
      @returns {number} - animation progress state
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
      @returns {number} - animation progress state
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
    }
  }
}
