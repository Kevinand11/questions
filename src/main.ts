import Vue from 'vue'
import VueRouter from 'vue-router'
import CompositionApi from '@vue/composition-api'
import App from './App.vue'
// @ts-ignore
import katex from 'katex/dist/katex.min'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'katex/dist/katex.min.css'

// @ts-ignore
window.katex = katex

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
		},
		{
			path: '/review',
			name: 'Review',
			component: () => import('@/views/Review.vue')
		}
	]
})

new Vue({
	render: (h) => h(App),
	router
}).$mount('#app')