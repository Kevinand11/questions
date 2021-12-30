<template>
	<div>
		<h1>CrossCheck Done Docs</h1>
		<div class="form-group my-3">
			<input v-model="id" class="form-control" placeholder="Enter id of the doc" type="text">
		</div>
		<button :disabled="!id" class="btn-lg btn-primary" @click="submit">CrossCheck Now</button>
		<p v-if="error" class="my-3 text-danger">{{ error }}</p>
		<hr class="my-5">
		<div v-if="fetched" class="mb-5">
			<h2>Non Specials</h2>
			<div>
				<div v-for="(question, index) in nonSpecials" :key="`nonSpecial`+index">
					<p>Order: {{ question.order }}</p>
					<p>{{ question.question }}</p>
					<p>A: {{ question.a }}</p>
					<p>B: {{ question.b }}</p>
					<p>C: {{ question.c }}</p>
					<p>D: {{ question.d }}</p>
					<p v-if="question.e">E: {{ question.e }}</p>
					<hr class="my-2">
				</div>
			</div>
		</div>
		<div v-if="fetched" class="mb-5">
			<h2>Specials</h2>
			<div>
				<div v-for="(question, index) in specials" :key="`special`+index">
					<p>Order: {{ question.order }}</p>
					<p>{{ question.question }}</p>
					<p>A: {{ question.a }}</p>
					<p>B: {{ question.b }}</p>
					<p>C: {{ question.c }}</p>
					<p>D: {{ question.d }}</p>
					<p v-if="question.e">E: {{ question.e }}</p>
					<hr class="my-2">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { parseContent } from '../../scripts/parseContent'

export default defineComponent({
	setup () {
		const id = ref('')
		const fetched = ref(false)
		const error = ref('')
		const specials = ref([] as any[])
		const nonSpecials = ref([] as any[])
		const submit = async () => {
			try {
				const link = `https://docs.google.com/document/d/${id.value}/export?format=txt`
				const content = await fetch(link).then((r) => r.text())
				fetched.value = true

				const { special, nonSpecial } = parseContent(content, link)
				specials.value = special
				nonSpecials.value = nonSpecial
			} catch (e: any) {
				error.value = e.message
			}
		}
		return {
			id, error, submit, specials, nonSpecials, fetched
		}
	}
})
</script>
