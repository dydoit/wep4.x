import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import ElementUI from 'element-ui';
import './styles/global.styl'
import 'element-ui/lib/theme-chalk/index.css';
import G6Editor from "@antv/g6-editor";
Vue.use(ElementUI);
Vue.prototype.$http = Axios
new Vue({
  el: '#app',
  render: h => h(App)
})
