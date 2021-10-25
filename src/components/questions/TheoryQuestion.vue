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
			<BaseEditor :error="factory.errors.question" :valid="factory.isValid('question')"
						:value.sync="factory.question" path="theoryQuestions/questions"
						placeholder="Question Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.answer" :valid="factory.isValid('answer')"
						:value.sync="factory.answer" path="theoryQuestions/answer" placeholder="Answer Content" />
		</div>

		<button class="btn-primary btn-lg" type="submit">Submit Question</button>
	</form>
	<PageLoading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAddTheoryQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'
import BaseEditor from '@/components/BaseEditor.vue'

export default defineComponent({
	name: 'TheoryQuestion',
	components: { PageLoading, BaseEditor },
	setup () {
		const questions = useAddTheoryQuestion()
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