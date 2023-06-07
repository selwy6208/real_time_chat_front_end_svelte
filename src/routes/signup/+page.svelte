<script lang="ts">
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import type { ActionData } from "./$types";
	import { goto } from "$app/navigation";

	export let form: ActionData;

	let formData = {
		email: '',
		password: '',
		confirmPassword: ''
  	};

  async function handleSubmit() {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
		goto("/chats");
        console.log('Response:', data);
      } else {
        // Request failed
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<section class="max-w-sm mx-auto mt-56">
	<div class="prose">
		<h1>Sign Up</h1>
	</div>
	<div class="flex gap-x-6 mt-4">
		<h1>Have Account ? </h1>
		<p>
			<a href="/login" class="link">Log In</a>
		</p>
	</div>

	<form
		class="flex flex-col gap-6 my-6"
		on:submit|preventDefault={handleSubmit}
	>
		{#if form?.error}
			<div class="alert alert-error">
				<div>
					<Fa icon={faWarning} />
					{form.error}
				</div>
			</div>
		{/if}
		<p>
			<input
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
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
				bind:value={formData.password}
			/>
		</p>
		<p>
			<input
				type="password"
				name="password-confirm"
				placeholder="Confirm password..."
				class="input input-bordered w-full"
				required
				bind:value={formData.confirmPassword}
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary w-full">Sign Up</button>
		</p>
	</form>
</section>
