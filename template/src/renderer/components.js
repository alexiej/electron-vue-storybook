import Vue from 'vue'

const files = require.context('./', true, /\.comp\.vue$/)

for (let key of files.keys()) {
  let path = key
  let array = key.split('/')
  key = array[array.length - 1].replace(/(\.comp\.vue)/g, '')
  Vue.component(key, files(path).default)
}
