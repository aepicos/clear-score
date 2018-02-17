<template>
  <div class="main-dial">
    <circular-graph :score="creditInfo"></circular-graph>

    <h1 class="main-dial--score">{{ creditInfo.score }}</h1>
    <h4 class="main-dial--max-score">out of {{ creditInfo.maxScoreValue }}</h4>
  </div>
</template>

<script>
import CircularGraph from './CircularGraph.vue'

export default {

  props: ['creditInfo'],

  components: {
    CircularGraph
  }
}
</script>

<style lang="scss" scoped>
  @import '~scss/globals';

  .main-dial {
    $dial-diameter: 80vmin;
    $dial-max-diameter: 400px;
    $dial-accent-color: #fff;

    @include flex-center(column);

    width: $dial-diameter;
    height: $dial-diameter;
    max-width: $dial-max-diameter;
    max-height: $dial-max-diameter;
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
      background-color: rgba($dial-accent-color, 0.2);
      border: 1px solid rgba($dial-accent-color, 0.5);
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
