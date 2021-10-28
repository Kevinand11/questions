<template>
	<math-field
		ref="mathDisplay"
		@input="input"
	>
		{{ value }}
	</math-field>
</template>

<script>
import Vue from 'vue'
import MathLive from 'mathlive/dist/mathlive.min.mjs'
import Mathfield from 'mathlive/dist/vue-mathlive.mjs'

Vue.use(Mathfield, MathLive)
export default {
	props: {
		value: {
			type: String,
			required: true
		},
		rawStyle: {
			type: String,
			required: false,
			default: ''
		}
	},
	async mounted () {
		await window.customElements.whenDefined('math-field')
		this.$refs.mathDisplay.setOptions({
			defaultMode: 'text',
			smartMode: false,
			mathModeSpace: '\\:',
			virtualKeyboardMode: 'manual'
		})
	},
	methods: {
		input (ev) {
			this.$emit('update:value', ev.target.value)
		}
	}
}
</script>