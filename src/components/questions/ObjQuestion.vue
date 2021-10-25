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
						:value.sync="factory.question" path="objQuestions/questions" placeholder="Question Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.a" :valid="factory.isValid('a')"
						:value.sync="factory.a" path="objQuestions/a" placeholder="Option A Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.b" :valid="factory.isValid('b')"
						:value.sync="factory.b" path="objQuestions/b" placeholder="Option B Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.c" :valid="factory.isValid('b')"
						:value.sync="factory.c" path="objQuestions/c" placeholder="Option C Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.d" :valid="factory.isValid('d')"
						:value.sync="factory.d" path="objQuestions/d" placeholder="Option D Content" />
		</div>

		<div class="form-group">
			<BaseEditor :error="factory.errors.e" :valid="factory.isValid('e')"
						:value.sync="factory.e" path="objQuestions/e" placeholder="Option E Content" />
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
import BaseEditor from '@/components/BaseEditor.vue'

export default defineComponent({
	name: 'ObjQuestion',
	components: { PageLoading, BaseEditor },
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