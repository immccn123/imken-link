<script lang="ts">
	import { Button, Container, Stack, Title } from "@svelteuidev/core";

	export let data;
</script>

<Container>
	<Stack align="center">
		<Title order={1}>Login</Title>
		<Button color="dark" href={data.authUrl}>Continue with GitHub</Button>
	</Stack>
</Container>
