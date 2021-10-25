<template>
	<div class="container py-4">
		<div class="d-flex mb-5">
			<img alt="Stranerd" class="mx-auto" src="@/assets/logo-blue.svg">
		</div>
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
import { defineComponent, ref } from '@vue/composition-api'
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
