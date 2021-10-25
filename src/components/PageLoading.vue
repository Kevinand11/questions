<template>
	<div class="position-relative">
		<div class="center">
			<div :style="`width:${size}rem;height:${size}rem;`" class="spinner-border text-dark" role="status" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PageLoading',
	props: {
		size: {
			type: Number,
			default: () => 3.5
		}
	}
})
</script>

<style scoped>
	.center {
		background: #ffffff88;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
</style>
