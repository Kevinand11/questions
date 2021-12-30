import Vue from 'vue'
import VueRouter from 'vue-router'
import CompositionApi from '@vue/composition-api'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(CompositionApi)
Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '*',
			name: 'Home',
			component: () => import('@/views/Home.vue')
		},
		{
			path: '/crosscheck',
			name: 'CrossCheck',
			component: () => import('@/views/CrossCheck.vue')
		}
	]
})

new Vue({
	render: (h) => h(App),
	router
}).$mount('#app')