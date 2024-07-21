<script lang="ts">
	import { Title, Button, Space, Paper } from "@svelteuidev/core";
</script>

<div
	style="display: flex; align-items: center; width: 100vw; height: 100vh; justify-content: center;"
>
	<Paper style="text-align: center">
		<Title style="text-align: center" order={1}>Imken.Link</Title>
		<Space h="xl" />
		<Button style="text-align: center" href="/!/login" fullSize
			>Login</Button
		>
	</Paper>
</div>
