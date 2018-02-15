<template>
  <div class="main-dial">
    <svg viewBox="0 0 300 300" class="main-dial--graph">
      <path d="M150,6c78.5,0,144,65.5,144,144s-65.5,144-144,144S6,228.5,6,150 S71.5,6,150,6z" />
    </svg>
    <h1 class="main-dial--score">{{ creditInfo.score }} out of {{ creditInfo.maxScoreValue }}</h1>
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

<style lang="scss" scoped></style>
