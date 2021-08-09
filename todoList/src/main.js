import Vue from 'vue'
import App from './App.vue'
import TodoList from './components/TodoList.vue';
import store from './store';




Vue.config.productionTip = true
Vue.component('TodoList', TodoList);


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
