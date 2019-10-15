import Vue from 'vue'
import App from './App'
let at = ['a','b'].includes('a')
alert(at)
new Vue({
  el: '#app',
  render: h => h(App)
})
