<template>
	<form @submit.prevent="addQuestion">
		<p>Question
			<BaseEditor :error="factory.errors.question" :valid="factory.isValid('question')"
			            :value.sync="factory.question" placeholder="Question Content" />
			<Media :factory="factory" class="form-group" name="question" />
		</p>
		<template v-if="question.type === 'objectives'">
			<p>Option A
				<BaseEditor :error="factory.errors.a" :valid="factory.isValid('a')"
				            :value.sync="factory.a" placeholder="Option A Content" />
				<Media :factory="factory" class="form-group" name="a" />
			</p>
			<p>Option B
				<BaseEditor :error="factory.errors.b" :valid="factory.isValid('b')"
				            :value.sync="factory.b" placeholder="Option B Content" />
				<Media :factory="factory" class="form-group" name="b" />
			</p>
			<p>Option C
				<BaseEditor :error="factory.errors.c" :valid="factory.isValid('c')"
				            :value.sync="factory.c" placeholder="Option C Content" />
				<Media :factory="factory" class="form-group" name="c" />
			</p>
			<p>Option D
				<BaseEditor :error="factory.errors.d" :valid="factory.isValid('d')"
				            :value.sync="factory.d" placeholder="Option D Content" />
				<Media :factory="factory" class="form-group" name="d" />
			</p>
			<p>Option E
				<BaseEditor :error="factory.errors.e" :valid="factory.isValid('e')"
				            :value.sync="factory.e" placeholder="Option E Content" />
				<Media :factory="factory" class="form-group" name="e" />
			</p>
			<div class="form-group">
				<select v-model="factory.answer" class="form-select text-capitalize">
					<option disabled>Correct Answer</option>
					<option v-for="value in answers" :key="value" :value="value">{{ value }}</option>
				</select>
			</div>
			<p>Explanation
				<BaseEditor :error="factory.errors.explanation" :valid="factory.isValid('explanation')"
				            :value.sync="factory.explanation" placeholder="Explanation Content" />
				<Media :factory="factory" class="form-group" name="explanation" />
			</p>
		</template>
		<template v-else>
			<p>
				Answer
				<BaseEditor :error="factory.errors.answer" :valid="factory.isValid('answer')"
				            :value.sync="factory.answer" placeholder="Answer Content" />
				<Media :factory="factory" class="form-group" name="answer" />
			</p>
		</template>
		<div class="d-flex justify-content-end">
			<button :disabled="loading || !factory.valid || !!images.length" class="btn btn-primary" type="submit">
				Submit Question
			</button>
		</div>
		<div class="my-3 flex gap-3">
			<img v-for="img in images" :key="img" :src="img" alt="" style="max-width: 400px;">
		</div>
		<PageLoading v-if="loading" />
		<p v-if="error" class="lead text-danger">{{ error }}</p>
		<hr class="mt-3">
	</form>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import BaseEditor from '@/components/BaseEditor.vue'
import DisplayHtml from '@/components/DisplayHtml.vue'
import { useAddObjQuestion, useAddTheoryQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'
import { answers } from '@/utils/questionModel'
import Media from '@/components/questions/Media.vue'

export default defineComponent({
	components: { BaseEditor, DisplayHtml, PageLoading, Media },
	props: {
		question: {
			required: true,
			type: Object
		}
	},
	setup (props) {
		let data = {} as unknown as ReturnType<typeof useAddTheoryQuestion | typeof useAddObjQuestion>
		if (props.question.type === 'objectives') {
			const q = useAddObjQuestion()
			q.factory.value.answer = ['a', 'b', 'c', 'd', 'e'][props.question.correctIndex]
			q.factory.value.a = props.question.options[0] ?? ''
			q.factory.value.b = props.question.options[1] ?? ''
			q.factory.value.c = props.question.options[2] ?? ''
			q.factory.value.d = props.question.options[3] ?? ''
			q.factory.value.e = props.question.options[4] ?? ''
			q.factory.value.explanation = props.question.explanation ?? ''
			data = q
		} else {
			const q = useAddTheoryQuestion(props.question.type)
			q.factory.value.answer = props.question.answer ?? ''
			data = q
		}
		data.factory.value.question = props.question.question ?? ''
		data.factory.value.examType = props.question.institution ?? ''
		data.factory.value.subject = props.question.course ?? ''
		data.factory.value.year = props.question.year ?? 0
		data.factory.value.order = props.question.order ?? 0

		const images = computed(() => {
			const links = [
				data.factory.value.question,
				data.factory.value.answer,
				// @ts-ignore
				data.factory.value.explanation,
				// @ts-ignore
				...(data.factory.value.options ?? [])
			]
			const div = document.createElement('div')
			div.innerHTML = links.join('\n')
			const urls = [] as string[]
			// @ts-ignore
			for (const img of div.getElementsByTagName('img')) urls.push(img.src)
			return urls.filter((url) => url)
		})

		return { ...data, answers, images }
	}
})
</script>
