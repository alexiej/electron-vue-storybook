import Vue from 'vue'
import methods from './methods'

Vue.mixin({
  methods
})

const files = require.context('./', true, /\.mixin\.js$/)

for (let k of files.keys()) {
  Vue.mixin(files(k).default)
}
