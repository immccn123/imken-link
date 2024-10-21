<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="container mx-auto mt-2">
	<div class="flex">
		<div class="flex-grow"></div>
		<h1 class="text-3xl inline">{$page.status}</h1>
		<span style="width: 10px;" />
		<span style="font-size: x-large"><strong>|</strong></span>
		<span style="width: 10px;" />
		{#if $page.status === 403}
			<span class="leading-none">
				这个账户似乎不被允许登录……
				<br />
				This account does not appear to be allowed to log in...
			</span>
		{:else}
			<span class="leading-none">
				出现了一些无法恢复的错误……
				<br />
				Some unrecoverable errors occurred...
			</span>
		{/if}
		<div class="flex-grow"></div>
	</div>
	<div class="text-center">
		<span>
			{$page.error?.message}<br />
			<a class="btn" href="/!/login">Back to Login</a>
		</span>
	</div>
</div>
