<script lang="ts">
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import type { ActionData } from "./$types";
	import { goto } from "$app/navigation";

	export let form: ActionData;
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
		method="POST"
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
				value={form?.email ?? ""}
			/>
		</p>
		<p>
			<input
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
			/>
		</p>
		<p>
			<input
				type="password"
				name="password-confirm"
				placeholder="Confirm password..."
				class="input input-bordered w-full"
				required
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary w-full">Sign Up</button>
		</p>
	</form>
</section>
