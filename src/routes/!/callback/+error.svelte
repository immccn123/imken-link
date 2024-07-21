<script lang="ts">
	import { page } from "$app/stores";
	import { Container, Text, Title, Center, Button, Space } from "@svelteuidev/core";
</script>

<Space h="xs" />

<Container>
	<Center>
		<Title order={1}>{$page.status}</Title>
		<span style="width: 10px;" />
		<span style="font-size: x-large"><strong>|</strong></span>
		<span style="width: 10px;" />
		{#if $page.status === 403}
			<Text>
				这个账户似乎不被允许登录……
				<br />
				This account does not appear to be allowed to log in...
			</Text>
		{:else}
			<Text>
				出现了一些无法恢复的错误……
				<br />
				Some unrecoverable errors occurred...
			</Text>
		{/if}
	</Center>
	<Center>
		<p>
			{$page.error?.message}<br />
			<Button href="/!/login">Back to Login</Button>
		</p>
	</Center>
</Container>
