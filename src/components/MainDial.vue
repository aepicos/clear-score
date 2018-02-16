<template>
  <div class="main-dial">
    <svg viewBox="0 0 300 300" class="main-dial--graph">
      <path d="M150,6c78.5,0,144,65.5,144,144s-65.5,144-144,144S6,228.5,6,150 S71.5,6,150,6z" />
    </svg>
    <h1 class="main-dial--score">{{ creditInfo.score }}</h1>
    <h4 class="main-dial--max-score">out of {{ creditInfo.maxScoreValue }}</h4>
  </div>
</template>

<script>
export default {
  props: ['creditInfo'],

  mounted () {
    console.log(this.creditInfo)
  }
}
</script>

<style lang="scss" scoped>
  @import '~scss/global';

  .main-dial {
    @include flex-center(column);

    width: 80vmin;
    height: 80vmin;
    max-width: 400px;
    max-height: 400px;
    position: relative;
    z-index: 10;
    border: 1px solid rgba(white, 0.5);
    border-radius: 50%;
    background-color: rgba(white, 0.2);

    &::before {
      @include fixed-background;

      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border-radius: 50%;
      -webkit-filter: blur(10px);
              filter: blur(10px);
    }

    &--graph {
      width: calc(100% - 0.6rem);
      height: calc(100% - 0.6rem);
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      fill: transparent;
      stroke: $_score_color;
      stroke: {
        linecap: round;
        width: 0.4rem;
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
