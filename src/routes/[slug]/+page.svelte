<script lang="ts">
	import { browser } from "$app/environment";
	export let data;
	import {
		Blockquote,
		Button,
		Container,
		Space,
		Title,
	} from "@svelteuidev/core";
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

{#if data.type === "captcha"}
	<Container>
		<Title order={2}>在继续之前，请完成人机验证。</Title>
		<Title order={3}>
			Please complete human verification before continuing.
		</Title>
		<Space h={"lg"} />
		<Turnstile siteKey={data.siteKey} on:callback={callback} />
	</Container>
{:else if data.type === "copy"}
	<Container>
		<Title order={2}>如要继续，请复制后再前往对应网页。</Title>
		<Title order={3}>
			If you want to continue, please copy it and then go to the
			corresponding web page.
		</Title>
		<Space h="xl" />
		<Blockquote icon={null}>{data.url}</Blockquote>
		<Button
			fullSize
			variant="light"
			on:click={() => navigator.clipboard.writeText(data.url)}
		>
			Copy
		</Button>
	</Container>
{/if}
