import './global.styl'
import Vue from 'vue'
import App from './App'
let at = ['a','b'].includes('a')
new Vue({
  el: '#app',
  render: h => h(App)
})
