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
		{#if $page.status === 404}
			<span class="leading-none">
				这个页面/短链找不到了！
				<br />
				The page / dynamic link you are looking for does not exist....
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
	<div class="text-center mt-3 leading-none">
		{#if $page.status === 404}
			它可能从来没有存在过，或者是已经被删除了？<br />
			Maybe it never existed, or has been deleted?
		{:else}
			我也不知道为什么。<br />
			But I don't know why.
		{/if}
	</div>
</div>
