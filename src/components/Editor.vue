<template>
	<div>
		<pre>{{ formula }}</pre>
		<MathDisplay :value.sync="formula" style="font-size: 32px;padding: 4px;" />
	</div>
</template>

<script>
import MathDisplay from '@/components/MathDisplay.vue'

export default {
	name: 'app',
	components: { MathDisplay },
	data: function () {
		return {
			formula: 'x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}'
		}
	}
}
</script>