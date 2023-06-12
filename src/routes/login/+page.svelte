<script lang="ts">
	import axios from "axios"
	import Fa from "svelte-fa"
	import { goto } from "$app/navigation"
	import { faWarning } from "@fortawesome/free-solid-svg-icons"


	export let errorMessage: string

	let formData = {
		email: '',
		password: '',
  	}

	async function handleSubmit(): Promise<void> {
		try {
			const response = await axios.post("http://localhost:8080/api/login", formData)

			if (response.status === 200) {
				// Request was successful
				const data = response.data;
				localStorage.setItem("token", `${data.token}`)
				goto("/chats");
			} else {
				// Request failed
				errorMessage = response.statusText
			}
		} catch (error) {
			errorMessage = "Email or password is incorrect!"
		}
	}
</script>

<section class="max-w-sm mx-auto mt-56">
	<form
		class="flex flex-col gap-6 my-6"
		on:submit|preventDefault={handleSubmit}
	>
		{#if errorMessage}
			<div class="alert alert-error">
				<div>
					<Fa icon={faWarning} />
					{errorMessage}
				</div>
			</div>
		{/if}
		<div class="prose">
			<h1>Log In</h1>
		</div>
		<div class="flex gap-x-6">
			<h1>No Account ? </h1>
			<p>
				<a href="/signup" class="link">Sign Up</a>
			</p>
		</div>
		<p>
			<input
				autocomplete="email"
				autocorrect="off"
				type="email"
				name="email"
				placeholder="Email..."
				class="input input-bordered w-full"
				required
				bind:value={formData.email}
			/>
		</p>
		<p>
			<input
				autocomplete="current-password"
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
				bind:value={formData.password}
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary w-full">Log In</button>
		</p>
	</form>
</section>
