<template>
  <div class="main-dial">

    <!--
      the main dial contains multiple 'pages' on the ClearScore website
      so the correct layout of this component should be:
        <main-dial>
          <main-dial--content>
            <circular-graph />
            <credit-score />
          </main-dial--content>
          <main-dial--content> ... </main-dial--content>
          <main-dial--content> ... </main-dial--content>
          ... etc ...
        </main-dial>
    -->

    <circular-graph :score="creditInfo"></circular-graph>
    <credit-score :score="creditInfo"></credit-score>
  </div>
</template>

<script>
import CircularGraph from './CircularGraph.vue'
import CreditScore from './CreditScore.vue'

export default {
  name: 'MainDial',
  props: ['creditInfo'],

  components: {
    CircularGraph,
    CreditScore
  }
}
</script>

<style lang="scss" scoped>
  @import '~scss/globals';

  .main-dial {
    $dial-diameter: 80vmin;
    $dial-max-diameter: 400px;
    $dial-accent-color: #fff;

    @include flex-center();

    width: $dial-diameter;
    height: $dial-diameter;
    max-width: $dial-max-diameter;
    max-height: $dial-max-diameter;
    position: relative;
    z-index: 10;
    border-radius: 50%;

    // frosted effect below
    // one pseudo element to blur
    // one pseudo element for a semi-transparent layer
    //   (which looks better than lightening with a filter)
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
  }
</style>
