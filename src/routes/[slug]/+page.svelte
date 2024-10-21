<script lang="ts">
	import { browser } from "$app/environment";
	export let data;
	import { Turnstile } from "svelte-turnstile";

	function callback(event: CustomEvent<{ token: string }>) {
		fetch(`/!/captcha`, {
			method: "POST",
			body: JSON.stringify({ token: event.detail.token }),
		}).then(() => {
			if (browser) {
				location.reload();
			}
		});
	}
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		{#if data.type === "captcha"}
			<h2 class="card-title">在继续之前，请完成人机验证。</h2>
			<p>Please complete human verification before continuing.</p>

			<Turnstile siteKey={data.siteKey} on:callback={callback} />
		{:else if data.type === "copy"}
			<h2 class="card-title">如要继续，请复制后再前往对应网页。</h2>
			<p>
				If you want to continue, please copy it and then go to the
				corresponding web page.
			</p>
			<pre><code>{data.url}</code></pre>
			<button
				on:click={() => navigator.clipboard.writeText(data.url)}
				class="btn"
			>
				Copy
			</button>
		{/if}
	</div>
</div>
