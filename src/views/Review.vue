<template>
	<div>
		<h1>Review MySchool Questions</h1>
		<div class="form-group d-flex gap-3 my-3">
			<select v-model="examType" class="form-select text-capitalize">
				<option v-for="examType in examTypes" :key="examType" :value="examType">{{ examType }}</option>
			</select>
			<select v-model="subject" class="form-select text-capitalize">
				<option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
			</select>
			<select v-model="year" class="form-select text-capitalize">
				<option v-for="year in years" :key="year" :value="year">{{ year }}</option>
			</select>
			<select v-model="questionType" class="form-select text-capitalize">
				<option v-for="questionType in questionTypes" :key="questionType" :value="questionType">
					{{ questionType }}
				</option>
			</select>
		</div>
		<button class="btn-lg btn-primary mb-3" @click="submit">Fetch Questions</button>
		<p v-if="error" class="my-3 text-danger">{{ error }}</p>
		<h3 v-if="questions.length">{{ questions.length }} questions</h3>
		<hr class="my-5">
		<div class="d-flex flex-column gap-3">
			<ReviewQuestion v-for="(question, index) in questions" :key="index" :index="index + 1"
			                :question="question" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { examTypes, questionTypes, subjects, years } from '@/utils/questionModel'
import ReviewQuestion from '@/components/questions/ReviewQuestion.vue'

export default defineComponent({
	components: { ReviewQuestion },
	setup () {
		const examType = ref(examTypes[0])
		const subject = ref(subjects[0])
		const year = ref(years[0])
		const questionType = ref(questionTypes[0])
		const questions = ref([])
		const fetched = ref(false)
		const error = ref('')
		const submit = async () => {
			try {
				error.value = ''
				const link = `/parsed/${questionType.value}/${examType.value}/${subject.value}/${year.value}.json`
				questions.value = await fetch(link).then(res => res.json()).catch(() => {
					throw new Error('this combo doesnt exist')
				})
			} catch (e: any) {
				error.value = e.message
				questions.value = []
			}
		}
		return {
			examType, subject, year, questionType,
			examTypes, subjects, years, questionTypes,
			error, submit, fetched, questions
		}
	}
})
</script>
