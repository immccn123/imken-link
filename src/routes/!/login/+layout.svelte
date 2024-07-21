<script lang="ts">
	import { Paper } from "@svelteuidev/core";
</script>

<div
	style="display: flex; align-items: center; width: 100vw; height: 100vh; justify-content: center;"
>
	<Paper style="text-align: center">
		<slot />
	</Paper>
</div>
