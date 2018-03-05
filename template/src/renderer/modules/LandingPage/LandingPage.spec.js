import Vue from 'vue'
import LandingPage from './LandingPage'
{{#isEnabled plugins 'vue-router'}}
import router from '../../router'
{{/isEnabled}}

{{#isEnabled plugins 'vuex'}}
import Vuex from 'vuex'
Vue.use(Vuex)

const storeText = 'Title test'
const store = new Vuex.Store({
  modules: {
    'LandingPage': {
      state: {
        namespaced: true,
        message: storeText
      }
    }
  }
})
{{/isEnabled}}

describe('LandingPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LandingPage){{#isEnabled plugins 'vuex'}},
      store: store{{/isEnabled}}{{#isEnabled plugins 'vue-router'}},
      router
      {{/isEnabled}}
    }).$mount()

    {{#isEnabled plugins 'vuex'}}
    expect(vm.$el.querySelector('.title').textContent).to.contain(storeText)
    {{else}}
    expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!')
    {{/isEnabled}}
  })
})
