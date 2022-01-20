<template>
	<div class="container py-4">
		<div class="d-flex mb-5">
			<router-link
				class="flex-grow border border-secondary w-50 p-3 text-secondary text-center text-decoration-none"
				exact-active-class="bg-primary text-white" to="/">Upload Questions
			</router-link>
			<router-link
				class="flex-grow border border-secondary w-50 p-3 text-secondary text-center text-decoration-none"
				exact-active-class="bg-primary text-white" to="/crosscheck">Crosscheck Doc
			</router-link>
			<router-link
				class="flex-grow border border-secondary w-50 p-3 text-secondary text-center text-decoration-none"
				exact-active-class="bg-primary text-white" to="/review">Review
			</router-link>
		</div>
		<router-view />
	</div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
