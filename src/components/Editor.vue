<template>
	<div>
		<h2>Math Editor</h2>
		<MathDisplay :value.sync="formula" style="font-size: 1.5rem;padding: 4px;" />
		<hr class="my-2">
		<div class="d-flex gap-4 justify-content-between align-items-center">
			<span class="flex-grow-1">{{ formula }}</span>
			<a class="text-info small p-1 text-decoration-none" @click="copy">Copy</a>
		</div>
	</div>
</template>

<script>
import MathDisplay from '@/components/MathDisplay.vue'
import { ref } from '@vue/composition-api'

export default {
	name: 'app',
	components: { MathDisplay },
	setup () {
		const formula = ref('x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}')
		const copy = async () => {
			const result = await window.navigator.permissions.query({ name: 'clipboard-write' })
			if (result.state === 'granted' || result.state === 'prompt') {
				await window.navigator.clipboard.writeText(formula.value)
				alert('copied')
			}
		}
		return { formula, copy }
	}
}
</script>