const files = require.context('./methods', true, /\.js$/)
const methods = {}

for (let k of files.keys()) {
  let filesMethods = files(k).default
  for (let m of Object.keys(filesMethods)) {
    methods[m] = filesMethods[m]
  }
}

export default methods
