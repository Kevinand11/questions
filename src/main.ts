import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(CompositionApi)

new Vue({
	render: (h) => h(App)
}).$mount('#app')