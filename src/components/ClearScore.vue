<template>
  <main role="main">
    <main-dial :creditInfo="creditInfo"></main-dial>
  </main>
</template>

<script>
import MainDial from './MainDial.vue'

export default {
  name: 'ClearScore',
  data () {
    return {
      creditInfo: '',
      score: '',
      maxScoreValue: '',
      minScoreValue: ''
    }
  },

  mounted () {
    this.$http.get('https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json').then(result => {
      this.creditInfo = result.data.creditReportInfo
    }, error => {
      console.error(error)
    })
  },

  components: {
    MainDial
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~scss/global";

  main {
    @include flex-center(column);
    @include fixed-background;

    min-height: 100vh;
  }
</style>
