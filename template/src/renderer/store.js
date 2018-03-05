import Vuex from 'vuex'
import Vue from 'vue'

/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', true, /\.store\.js$/)
const modules = {}

files.keys().forEach(key => {
  let path = key
  let array = key.split('/')
  key = array[array.length - 1]
  modules[key.replace(/(\.store\.js)/g, '')] = files(path).default
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
