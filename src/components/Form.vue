<template>
	<div class="hello">
		<h1>Hello</h1>
		<vue-editor
			v-model="value"
			placeholder="placeholder"
			use-custom-image-handler
		/>
	</div>
</template>

<script>
import { VueEditor } from 'vue3-editor'
import { ref } from 'vue'

export default {
	name: 'Form',
	components: { VueEditor },
	setup () {
		const value = ref('')
		return { value }
	}
}
</script>
