<script lang="ts">
	import type { Link } from "$lib/db/schema.js";
	import type { CreateLink, GetLink, RemoveLink } from "$lib/api/schema.js";
	import MdiTrash from "~icons/mdi/trash";
	import MdiContentCopy from "~icons/mdi/content-copy";

	import { nanoid } from "nanoid";
	import { linkFlag } from "$lib/constants.js";
	import { onMount } from "svelte";

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

	onMount(() => {
		refreshLinks();
	});

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

<div class="container mx-auto px-2 mt-5">
	<h1 class="text-3xl">Dashboard</h1>

	<div class="mt-2">
		<span class="badge">GitHub {data.session.userId}</span>
		<span class="badge">
			Catpcha {data.session.isHuman ? "passed" : "not passed"}
		</span>
	</div>

	<h2 class="text-2xl mt-2">Create Link</h2>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 w-full">
		<div>
			<div class="label">
				<span class="label-text">Slug</span>
			</div>
			<input
				type="text"
				bind:value={slug}
				placeholder="Leave blank to generate one"
				class="input input-bordered w-full"
				disabled={isSubmitting}
			/>
		</div>

		<div>
			<div class="label">
				<span class="label-text">Destination</span>
			</div>
			<input
				type="text"
				bind:value={destination}
				placeholder="https://google.com"
				class="input input-bordered w-full"
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">CAPTCHA required</span>
				<input
					type="checkbox"
					disabled={isSubmitting}
					bind:checked={captchaRequired}
					class="checkbox"
				/>
			</label>
			<label class="label cursor-pointer">
				<span class="label-text">Copy required</span>
				<input
					type="checkbox"
					disabled={isSubmitting}
					bind:checked={copyRequired}
					class="checkbox"
				/>
			</label>
		</div>
	</div>

	<button
		class="btn w-full btn-sm"
		disabled={isSubmitting}
		on:click={createLink}
	>
		Submit
	</button>

	<h2 class="text-2xl mt-2">All Links</h2>

	{#if isLinkLoading}
		Loading...
	{:else}
		<table class="table">
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
							<a class="link link-primary" href={`/${slug}`}>
								{slug}
							</a>
						</td>
						<td>
							<a class="link link-primary" href={destination}>
								{destination}
							</a>
						</td>
						<td>
							{#if flag & linkFlag.captchaRequired}
								<span class="badge badge-accent">Captcha</span>
							{/if}
							{#if flag & linkFlag.copyRequired}
								<span class="badge badge-neutral">Copy</span>
							{/if}
						</td>
						<td class="join">
							<button
								on:click={removeLinkMaker(id)}
								disabled={isSubmitting}
								class="btn btn-sm btn-error join-item"
							>
								<MdiTrash />
							</button>

							<button
								on:click={() =>
									navigator.clipboard.writeText(
										`${location.origin}/${slug}`,
									)}
								class="btn btn-sm join-item"
							>
								<MdiContentCopy />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
