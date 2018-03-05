import Vue from 'vue';
import Router from 'vue-router'

/**
 * Enables router definition
 */
Vue.use(Router)


const files = require.context('./', true, /\.routes\.js$/)
const routesValues = {}
const routes = []

for (let k of files.keys()) {
  let rt = files(k).default
  for (let r of rt) {
    // let path = r.path === '/' ? '/' + r.name : r.path
    routesValues[r.path] = {
      parent: r.parent,
      route: r
    }
  }
}

for (let r of Object.values(routesValues)) {
  if (r.parent !== '' && r.parent !== undefined && routesValues[r.parent] !== undefined) {
    let rp = routesValues[r.parent].route
    if (rp.children === undefined) rp.children = []
    rp.children.push(r.route)
  } else routes.push(r.route)
}

routes.push(
  {
    path: '*',
    redirect: '/'
  }
)

export default new Router({routes})

