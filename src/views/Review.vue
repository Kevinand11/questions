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
		<hr class="my-5">
		<template v-if="questions.length">
			<Editor />
			<hr class="my-5">
			<h3>{{ questions.length }} questions</h3>
			<select v-model="index" class="form-select text-capitalize my-3">
				<option :value="-1">Select A Number</option>
				<option v-for="(question, num) in questions" :key="num" :value="num">
					Question {{ question.order }}
				</option>
			</select>
			<ReviewQuestion v-if="questions[index]" :key="examType + subject + year + questionType + index"
			                :question="questions[index]" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { examTypes, questionTypes, subjects, years } from '@/utils/questionModel'
import ReviewQuestion from '@/components/questions/ReviewQuestion.vue'
import Editor from '@/components/Editor.vue'

export default defineComponent({
	components: { ReviewQuestion, Editor },
	setup () {
		const examType = ref(examTypes[0])
		const subject = ref(subjects[0])
		const year = ref(years[0])
		const questionType = ref(questionTypes[0])
		const questions = ref([])
		const index = ref(0)
		const fetched = ref(false)
		const error = ref('')
		const submit = async () => {
			try {
				error.value = ''
				const link = `${process.env.NODE_ENV === 'production' ? '/questions' : ''}/parsed/${questionType.value}/${examType.value}/${subject.value}/${year.value}.json`
				questions.value = await fetch(link).then(res => res.json()).catch(() => {
					throw new Error('this combo doesnt exist')
				})
				index.value = -1
			} catch (e: any) {
				error.value = e.message
				questions.value = []
			}
		}
		return {
			examType, subject, year, questionType,
			examTypes, subjects, years, questionTypes,
			error, submit, fetched, questions, index
		}
	}
})
</script>
