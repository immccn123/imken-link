<script lang="ts">
	import type { Link } from "$lib/db/schema.js";
	import type { CreateLink, GetLink, RemoveLink } from "$lib/api/schema.js";
	import {
		Badge,
		Button,
		Checkbox,
		Container,
		Grid,
		Input,
		InputWrapper,
		SimpleGrid,
		Space,
		Title,
		Anchor,
	} from "@svelteuidev/core";
	import { nanoid } from "nanoid";
	import { linkFlag } from "$lib/constants.js";

	export let data;

	let links: Link[] = [];

	let slug = "";
	let destination = "";
	let captchaRequired = false,
		copyRequired = false;

	let isSubmitting = false;
	let isLinkLoading = false;

	const perPage = 50;
	let currentPage = 1;

	function refreshLinks() {
		isLinkLoading = true;
		fetch(`/!/api`, {
			method: "POST",
			body: JSON.stringify({
				offset: perPage * (currentPage - 1),
				limit: perPage,
			} as GetLink),
		})
			.then(async (x) => (await x.json()) as Link[])
			.then((x) => (links = x))
			.finally(() => (isLinkLoading = false));
	}

	$: refreshLinks();

	function createLink() {
		if (slug === "") slug = nanoid(8);
		let flag = 0;
		if (captchaRequired) flag |= linkFlag.captchaRequired;
		if (copyRequired) flag |= linkFlag.copyRequired;

		isSubmitting = true;

		fetch(`/!/api`, {
			method: "PUT",
			body: JSON.stringify({ slug, flag, destination } as CreateLink),
		}).finally(() => {
			isSubmitting = false;
			refreshLinks();
		});
	}

	function removeLinkMaker(id: number) {
		return () => {
			isSubmitting = true;

			fetch(`/!/api`, {
				method: "DELETE",
				body: JSON.stringify({ id } as RemoveLink),
			}).finally(() => {
				isSubmitting = false;
				refreshLinks();
			});
		};
	}
</script>

<Space h="lg" />

<Container>
	<Title order={1}>Dashboard</Title>
	<Space h="lg" />

	<Badge>GitHub {data.session.userId}</Badge>

	{#if data.session.isHuman}
		<Badge>CAPTCHA Passed</Badge>
	{:else}
		<Badge color="red">CAPTCHA Not Passed</Badge>
	{/if}

	<Space h="sm" />

	<Title order={2}>Create Link</Title>

	<Space h="xs" />

	<Grid cols={2}>
		<Grid.Col xs={2} sm={1}>
			<InputWrapper label="Slug">
				<Input
					bind:value={slug}
					disabled={isSubmitting}
					placeholder="Leave blank to generate one"
				/>
			</InputWrapper>
		</Grid.Col>
		<Grid.Col xs={2} sm={1}>
			<InputWrapper label="Destination" required>
				<Input
					bind:value={destination}
					disabled={isSubmitting}
					placeholder="Must be an URL"
				/>
			</InputWrapper>
		</Grid.Col>
		<Grid.Col span={2}>
			<SimpleGrid cols={2}>
				<Checkbox
					bind:checked={captchaRequired}
					disabled={isSubmitting}
					label="CAPTCHA required"
					size="sm"
				/>
				<Checkbox
					bind:checked={copyRequired}
					disabled={isSubmitting}
					label="Copy required"
					size="sm"
				/>
			</SimpleGrid>
		</Grid.Col>
	</Grid>

	<Space h="lg" />

	<Button fullSize loading={isSubmitting} on:click={createLink}>Submit</Button
	>
</Container>

<Space h="lg" />

<Container>
	<Title order={2}>All Links</Title>
	<Space h="xs" />
	{#if isLinkLoading}
		Loading...
	{:else}
		<table>
			<thead>
				<tr>
					<th scope="col">Id</th>
					<th scope="col">Slug</th>
					<th scope="col">Destination</th>
					<th scope="col">Flags</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each links as { id, slug, destination, flag }}
					<tr>
						<td>#{id}</td>
						<td>
							<Anchor href={`/${slug}`}>{slug}</Anchor>
						</td>
						<td>
							<Anchor href={destination}>{destination}</Anchor>
						</td>
						<td>
							{#if flag & linkFlag.captchaRequired}
								<Badge size="xs" color="yellow">Captcha</Badge>
							{/if}
							{#if flag & linkFlag.copyRequired}
								<Badge size="xs">Copy</Badge>
							{/if}
						</td>
						<td>
							<Button
								on:click={removeLinkMaker(id)}
								size="xs"
								color="red"
								disabled={isSubmitting}
							>
								Delete
							</Button>

							<Button
								on:click={() =>
									navigator.clipboard.writeText(
										`${location.origin}/${slug}`,
									)}
								size="xs"
							>
								Copy
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</Container>

<style>
	/* https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table */
	table {
		border-collapse: collapse;
		border: 2px solid rgb(140 140 140);
		font-family: sans-serif;
		font-size: 0.8rem;
		letter-spacing: 1px;
	}

	thead {
		background-color: rgb(228 240 245);
	}

	th,
	td {
		border: 1px solid rgb(160 160 160);
		padding: 8px 10px;
	}

	td:last-of-type {
		text-align: center;
	}

	tbody > tr:nth-of-type(even) {
		background-color: rgb(237 238 242);
	}
</style>
