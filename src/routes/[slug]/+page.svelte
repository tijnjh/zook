<script lang="ts">
	let { data }: { data: any } = $props();
	import { page } from '$app/state';

	import Search from 'lucide-svelte/icons/search';
	import Link from 'lucide-svelte/icons/link';

	const r = data.data;

	// somehow this actually makes routing work properly
	// svelte really is goated
	$effect(() => $page.params.slug);

	const query = decodeURIComponent(page.url.pathname).replaceAll('/', '');
</script>

<svelte:head>
	{#if r.Abstract}
		<meta name="description" content={r.Abstract} />
		<title>{r.Heading ?? 'Zook'}</title>
		<meta name="og:image" content={`https://duckduckgo.com${r.Image}`} />
	{/if}
</svelte:head>

<main class="grid max-w-3xl grid-cols-1 gap-6 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]">
	<a href="/" class="mb-6 flex items-center gap-2">
		?
		<span class="text-nord6/50" style={`view-transition-name: ${query.replaceAll(' ', '_')}`}>
			{query}
		</span>
	</a>

	{#if r.Heading}
		<h1>{r.Heading}</h1>
	{/if}

	{#if r.Abstract}
		<aside>
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
	{/if}

	{#if r.Results.length}
		<h2 class="text-nord6/50">links</h2>

		<ul>
			{#each r.Results as result}
				{#if result.FirstURL}
					<li class="mb-6">
						<a href={result.FirstURL} class="group flex items-center gap-2">
							<Link class="size-4 shrink-0" />

							<span class="truncate group-hover:underline">
								{result.Text}
							</span>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}

	{#if r.RelatedTopics.length}
		<h2 class="text-nord6/50">related queries</h2>

		<ul>
			{#each r.RelatedTopics as topic}
				{#if topic.FirstURL}
					{@const q = topic.FirstURL.split('/').reverse()[0].replaceAll('_', '%20').toLowerCase()}
					{#if decodeURIComponent(q) !== query}
						<li class="mb-6">
							<a href={`/${q}`} class="group flex items-center gap-2">
								<Search class="size-4 shrink-0" />
								<div class="truncate">
									<span
										class="truncate group-hover:underline"
										style={`view-transition-name: ${decodeURIComponent(q).replaceAll(' ', '_')}`}
									>
										{decodeURIComponent(q)}
									</span>
								</div>
							</a>
						</li>
					{/if}
				{/if}
			{/each}
		</ul>
	{/if}
</main>
