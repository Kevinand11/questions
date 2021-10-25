<template>
	<div class="d-flex flex-column align-items-start">
		<span class="text-capitalize">{{ name }} Media</span>
		<input
			:ref="`${name}Ref`"
			accept="image/*"
			class="d-none"
			multiple
			type="file"
			@change="catchMedia"
		>
		<p v-if="factory.getMedia(name).length" class="d-flex gap-0-5">
				<span v-for="attachment in factory.getMedia(name)" :key="attachment.name" class="me-3">
					<span class="me-2">{{ attachment.name }}</span>
					<a class="text-danger" @click.prevent="factory.removeMedia(name, attachment)">
						<i class="fas fa-times" />
					</a>
				</span>
		</p>
		<a
			class="text-info align-self-start"
			@click.prevent="() => { $refs[`${name}Ref`].value= ''; $refs[`${name}Ref`].click() }"
		>
			{{ factory.getMedia(name).length > 0 ? 'Add' : 'Upload' }} {{ name + 'Media' }}
		</a>
		<span v-if="factory.errors[`${name}Media`]" class="text-danger small">
				{{ factory.errors[`${name}Media`] }}
			</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { useMultipleFileInputs } from '@/hooks/questions'
import { ObjQuestionFactory } from '@/utils/objquestionFactory'
import { TheoryQuestionFactory } from '@/utils/theoryquestionFactory'

export default defineComponent({
	props: {
		factory: {
			type: Object as PropType<ObjQuestionFactory | TheoryQuestionFactory>,
			required: true
		},
		name: {
			type: String as PropType<'question' | 'answer' | 'a' | 'b' | 'c' | 'd' | 'e'>,
			required: true
		}
	},
	setup (props) {
		const { catchMultipleFiles: catchMedia } = useMultipleFileInputs(
			(files: File[]) => {
				files.map((file) => props.factory.addMedia(props.name as any, file))
			}
		)
		return { catchMedia }
	}
})
</script>