<template>
	<div>
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
				<select v-model.number="factory.year" class="form-select">
					<option disabled>Question Year</option>
					<option v-for="value in years" :key="value" :value="value">{{ value }}</option>
				</select>
			</div>

			<div class="form-group">
				<input v-model.number="factory.order" class="form-control" max="100" min="1"
					   placeholder="Question Order"
					   type="number">
			</div>

			<div class="form-group">
				<BaseEditor :error="factory.errors.question" :valid="factory.isValid('question')"
							:value.sync="factory.question" path="objQuestions/questions"
							placeholder="Question Content" />
			</div>

			<Media :factory="factory" class="form-group" name="question" />

			<div class="form-group">
				<BaseEditor :error="factory.errors.a" :valid="factory.isValid('a')"
							:value.sync="factory.a" path="objQuestions/a" placeholder="Option A Content" />
			</div>

			<Media :factory="factory" class="form-group" name="a" />

			<div class="form-group">
				<BaseEditor :error="factory.errors.b" :valid="factory.isValid('b')"
							:value.sync="factory.b" path="objQuestions/b" placeholder="Option B Content" />
			</div>

			<Media :factory="factory" class="form-group" name="b" />

			<div class="form-group">
				<BaseEditor :error="factory.errors.c" :valid="factory.isValid('b')"
							:value.sync="factory.c" path="objQuestions/c" placeholder="Option C Content" />
			</div>

			<Media :factory="factory" class="form-group" name="c" />

			<div class="form-group">
				<BaseEditor :error="factory.errors.d" :valid="factory.isValid('d')"
							:value.sync="factory.d" path="objQuestions/d" placeholder="Option D Content" />
			</div>

			<Media :factory="factory" class="form-group" name="d" />

			<div class="form-group">
				<BaseEditor :error="factory.errors.e" :valid="factory.isValid('e')"
							:value.sync="factory.e" path="objQuestions/e" placeholder="Option E Content" />
			</div>

			<Media :factory="factory" class="form-group" name="e" />

			<div class="form-group">
				<select v-model="factory.answer" class="form-select text-capitalize">
					<option disabled>Correct Answer</option>
					<option v-for="value in answers" :key="value" :value="value">{{ value }}</option>
				</select>
			</div>

			<p v-if="error" class="lead text-danger">{{ error }}</p>

			<button :disabled="loading || !factory.valid" class="btn btn-primary" type="submit">
				Submit Question
			</button>

		</form>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAddObjQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'
import BaseEditor from '@/components/BaseEditor.vue'
import Media from '@/components/questions/Media.vue'

export default defineComponent({
	name: 'ObjQuestion',
	components: { PageLoading, BaseEditor, Media },
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