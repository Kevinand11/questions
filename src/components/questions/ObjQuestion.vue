<template>
	<form @submit.prevent="addQuestion">
		<div class="form-group">
			<select v-model="factory.examType" class="form-select">
				<option disabled>Question Exam Type</option>
				<option v-for="value in examTypes" :key="value" :value="value">{{ value }}</option>
			</select>
		</div>
		<div class="form-group">
			<select v-model="factory.subject" class="form-select">
				<option disabled>Question Subject</option>
				<option v-for="value in subjects" :key="value" :value="value">{{ value }}</option>
			</select>
		</div>
		<div class="form-group">
			<select v-model="factory.year" class="form-select">
				<option disabled>Question Year</option>
				<option v-for="value in years" :key="value" :value="value">{{ value }}</option>
			</select>
		</div>
		<div class="form-group">
			<select v-model="factory.answer" class="form-select">
				<option disabled>Correct Answer</option>
				<option v-for="value in answers" :key="value" :value="value">{{ value }}</option>
			</select>
		</div>
	</form>
	<PageLoading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAddObjQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'

export default defineComponent({
	name: 'ObjQuestion',
	components: { PageLoading },
	setup () {
		const questions = useAddObjQuestion()
		return {
			...questions
		}
	}
})
</script>

<style>
	.form-group {
		margin-bottom: 1.5rem;
	}
</style>