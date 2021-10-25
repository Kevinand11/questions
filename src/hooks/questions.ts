import { answers, examTypes, ObjQuestionFactory, subjects, years } from '@/utils/objquestionFactory'
import { ref } from 'vue'
import { saveQuestionToDatabase } from '@/utils/firebase'

export const useAddObjQuestion = () => {
	const factory = ref(new ObjQuestionFactory())
	const error = ref('')
	const loading = ref(false)

	const addQuestion = async () => {
		error.value = ''
		if (factory.value.valid && !loading.value) {
			try {
				const model = await factory.value.toModel()
				await saveQuestionToDatabase(model, 'objectives')
				factory.value.reset()
				loading.value = true
			} catch (e: any) {
				error.value = e.message
			} finally {
				loading.value = false
			}
		} else factory.value.validateAll()
	}

	return {
		answers, subjects, years, examTypes, factory,
		error, loading, addQuestion
	}
}