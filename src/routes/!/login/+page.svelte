<script lang="ts">
	export let data;
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content text-center">
		<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
			<form class="card-body">
				<h1 class="text-3xl">Imken.Link Login</h1>
				<a class="btn" href={data.authUrl}>Continue with GitHub</a>
			</form>
		</div>
	</div>
</div>
