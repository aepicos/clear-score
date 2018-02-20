<template>
  <div class="test-component">
    <h1>Testing: {{ testMessage }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data () {
    return {
      testMessage: '1 2 3'
    }
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>
