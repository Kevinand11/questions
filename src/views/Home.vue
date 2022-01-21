<template>
	<div>
		<Editor />
		<hr class="my-5">
		<div class="d-flex mb-5">
			<img alt="Stranerd" class="mx-auto" src="@/assets/logo-blue.svg">
		</div>
		<div class="lead text-capitalize mb-3">
			<select v-model="type" class="form-control text-capitalize">
				<option v-for="questionType in questionTypes" :key="questionType" :value="questionType">
					{{ questionType }}
				</option>
			</select>
		</div>
		<ObjQuestion v-if="type === 'objectives'" />
		<TheoryQuestion v-if="type === 'theory'" :path="type" />
		<TheoryQuestion v-if="type === 'practical'" :path="type" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import ObjQuestion from '@/components/questions/ObjQuestion.vue'
import TheoryQuestion from '@/components/questions/TheoryQuestion.vue'
import Editor from '@/components/Editor.vue'
import { questionTypes } from '@/utils/questionModel'

export default defineComponent({
	components: { ObjQuestion, TheoryQuestion, Editor },
	setup () {
		const type = ref(questionTypes[0])
		return {
			questionTypes, type
		}
	}
})
</script>
