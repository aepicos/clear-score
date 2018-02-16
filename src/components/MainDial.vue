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
