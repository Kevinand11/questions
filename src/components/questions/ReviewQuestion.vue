<template>
	<form class="position-relative" @submit.prevent="addQuestion">
		<div :class="{'p-3': isDisabled}">
			<p>Question
				<BaseEditor :error="factory.errors.question" :valid="factory.isValid('question')"
				            :value.sync="factory.question" placeholder="Question Content" />
			</p>
			<template v-if="question.type === 'objectives'">
				<p>Option A
					<BaseEditor :error="factory.errors.a" :valid="factory.isValid('a')"
					            :value.sync="factory.a" placeholder="Option A Content" />
				</p>
				<p>Option B
					<BaseEditor :error="factory.errors.b" :valid="factory.isValid('b')"
					            :value.sync="factory.b" placeholder="Option B Content" />
				</p>
				<p>Option C
					<BaseEditor :error="factory.errors.c" :valid="factory.isValid('c')"
					            :value.sync="factory.c" placeholder="Option C Content" />
				</p>
				<p>Option D
					<BaseEditor :error="factory.errors.d" :valid="factory.isValid('d')"
					            :value.sync="factory.d" placeholder="Option D Content" />
				</p>
				<p>Option E
					<BaseEditor :error="factory.errors.e" :valid="factory.isValid('e')"
					            :value.sync="factory.e" placeholder="Option E Content" />
				</p>
				<p>Explanation
					<BaseEditor :error="factory.errors.explanation" :valid="factory.isValid('explanation')"
					            :value.sync="factory.explanation" placeholder="Explanation Content" />
				</p>
			</template>
			<template v-else>
				<p>
					Answer
					<BaseEditor :error="factory.errors.answer" :valid="factory.isValid('answer')"
					            :value.sync="factory.answer" placeholder="Answer Content" />
				</p>
			</template>
		</div>
		<div class="d-flex justify-content-end">
			<button :disabled="loading || !factory.valid" class="btn btn-primary" type="submit">
				Submit Question
			</button>
		</div>
		<PageLoading v-if="loading" />
		<p v-if="error" class="lead text-danger">{{ error }}</p>
		<div v-if="isDisabled" class="disabled">
			This question has some special content. Re-upload it using the 1st interface
		</div>
		<hr v-else class="mt-3">
	</form>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import BaseEditor from '@/components/BaseEditor.vue'
import DisplayHtml from '@/components/DisplayHtml.vue'
import { useAddObjQuestion, useAddTheoryQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'

export default defineComponent({
	components: { BaseEditor, DisplayHtml, PageLoading },
	props: {
		question: {
			required: true,
			type: Object
		}
	},
	setup (props) {
		const containsImg = (text: string) => !!text?.includes('<img')
		const isDisabled = computed(() => {
			const matches = [
				containsImg(props.question.question),
				containsImg(props.question.answer),
				containsImg(props.question.explanation),
				...(props.question.options?.map((option: string) => containsImg(option)) ?? [])
			]
			return matches.some((m) => m)
		})
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

		return { isDisabled, ...data }
	}
})
</script>

<style>
    .disabled {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #00000044;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        z-index: 10;
        font-weight: 600;
    }
</style>