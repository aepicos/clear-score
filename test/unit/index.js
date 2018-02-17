import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.

// srcContext updated to match only js and vue files (excl main.js)
// as global scss files were blocking tests
// (https://github.com/vuejs-templates/webpack/issues/163)
const srcContext = require.context('../../src', true, /^\.\/(?!main\.js$).+\.(js|vue)$/i)
srcContext.keys().forEach(srcContext)
