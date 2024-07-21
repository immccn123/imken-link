<script lang="ts">
	import { page } from "$app/stores";
	import { Container, Text, Title, Center, Space } from "@svelteuidev/core";
</script>

<Space h="xs" />

{#if $page.status === 404}
	<Container>
		<Center>
			<Title order={1}>404 Not Found</Title>
			<span style="width: 10px;" />
			<span style="font-size: x-large"><strong>|</strong></span>
			<span style="width: 10px;" />
			<Text>
				这个页面/短链找不到了！
				<br />
				The page / dynamic link you are looking for does not exist...
			</Text>
		</Center>
		<Center>
			<p>
				它可能从来没有存在过，或者是已经被删除了？<br />
				Maybe it never existed, or has been deleted?
			</p>
		</Center>
	</Container>
{:else}
	<Container>
		<Center>
			<Title order={1}>{$page.status}</Title>
			<span style="width: 10px;" />
			<span style="font-size: x-large"><strong>|</strong></span>
			<span style="width: 10px;" />
			<Text>
				出现了一些无法恢复的错误……
				<br />
				Some unrecoverable errors occurred...
			</Text>
		</Center>
		<Center>
			<p>
				我也不知道为什么。<br />
				But I don't know why.
			</p>
		</Center>
	</Container>
{/if}
