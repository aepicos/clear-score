<template>
  <router-view id="app" />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
html,
body {
  height: 100%;
  width: 100%;
}
body {
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

a {
  cursor: pointer;
}
</style>
