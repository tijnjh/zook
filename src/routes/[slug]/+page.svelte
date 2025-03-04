<script lang="ts">
	let { data }: { data: any } = $props();
	import { page } from '$app/state';

	const r = data.data;

	// somehow this actually makes routing work properly
	// svelte really is goated
	$effect(() => $page.params.slug);
</script>

<svelte:head>
	{#if r.Abstract}
		<meta name="description" content={r.Abstract} />
		<title>{r.Heading}</title>
		<meta name="og:image" content={`https://duckduckgo.com${r.Image}`} />
	{/if}
</svelte:head>

<main class="grid max-w-3xl grid-cols-1 gap-6 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]">
	<aside>
		<a href={r.AbstractURL}>
			<h1 class="text-nord6/50 mb-6">-> {r.Heading}</h1>
		</a>
		<div class="flex flex-col gap-6 md:flex-row">
			{#if r.Image}
				<img
					src={`https://duckduckgo.com${r.Image}`}
					alt={r.Heading}
					class="mb-2 h-fit w-32 rounded object-cover object-top md:order-1"
				/>
			{/if}

			<p>
				{r.Abstract}
			</p>
		</div>
	</aside>

	{#if r.RelatedTopics}
		<h2 class="text-nord6/50">related</h2>

		<ul>
			{#each r.RelatedTopics as topic}
				{#if topic.FirstURL}
					{@const query = topic.FirstURL.split('/').reverse()[0]}
					<li class="mb-6">
						<a href={`/${query.replaceAll('_', '+')}`}>
							<h3>-> {query}</h3>
						</a>
						<p class="text-nord6/50">{topic.Text}</p>
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<h2 class="text-nord6/50">no results found :(</h2>
	{/if}
</main>
