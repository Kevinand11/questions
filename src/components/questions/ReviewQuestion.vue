<template>
	<div class="position-relative">
		<div class="p-3">
			<p>Question {{ index }}</p>
			<p>Question:
				<DisplayHtml :html="question.question" />
			</p>
			<template v-if="question.type === 'objectives'">
				<p v-for="option in question.options" :key="option">
					Option:
					<DisplayHtml :html="option" />
				</p>
				<p>Explanation:
					<DisplayHtml v-if="question.explanation" :html="question.explanation" />
				</p>
			</template>
			<template v-else>
				<p>
					Answer:
					<DisplayHtml :html="question.answer" />
				</p>
			</template>
		</div>
		<div v-if="isDisabled" class="disabled">
			This question has some special content. Re-upload it using the 1st interface
		</div>
		<hr v-else class="mt-3">
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import BaseEditor from '@/components/BaseEditor.vue'
import DisplayHtml from '@/components/DisplayHtml.vue'

export default defineComponent({
	components: { BaseEditor, DisplayHtml },
	props: {
		question: {
			required: true,
			type: Object
		},
		index: {
			required: true,
			type: Number
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
		return { isDisabled }
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