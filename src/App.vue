<template>
	<div class="container p-1">
		<img alt="Stranerd" class="mt-n1 mb-5" src="@/assets/logo-blue.svg">
		<div class="lead text-capitalize mb-3">
			<select v-model="type" class="form-control text-capitalize">
				<option v-for="value in values" :key="value" :value="value">{{ value }}</option>
			</select>
		</div>
		<ObjQuestion v-if="type === 'objectives'" />
		<TheoryQuestion v-if="type === 'theory'" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ObjQuestion from '@/components/questions/ObjQuestion.vue'
import TheoryQuestion from '@/components/questions/TheoryQuestion.vue'

export default defineComponent({
	components: { ObjQuestion, TheoryQuestion },
	setup () {
		const values = ['objectives', 'theory']
		const type = ref(values[0])
		return {
			values, type
		}
	}
})
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
