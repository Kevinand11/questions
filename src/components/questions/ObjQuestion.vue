<template>
	<form @submit.prevent="addQuestion">
		<input type="text">
	</form>
	<PageLoading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAddObjQuestion } from '@/hooks/questions'
import PageLoading from '@/components/PageLoading.vue'

export default defineComponent({
	name: 'ObjQuestion',
	components: { PageLoading },
	setup () {
		const questions = useAddObjQuestion()
		return {
			...questions
		}
	}
})
</script>