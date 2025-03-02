<script lang="ts">
	import { browser } from '$app/environment';

	let searchQuery = $state();

	function handleSubmit() {
		if (browser) location.href = `/${searchQuery}`;
	}
</script>

<header>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		class="flex max-w-3xl gap-2 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]"
	>
		<span class="text-nord6">?</span>
		<input
			id="q"
			type="text"
			name="q"
			placeholder="search the internet"
			class="placeholder:text-nord6/50 grow bg-transparent outline-none"
			bind:value={searchQuery}
		/>
		<input type="submit" value="search" class="hover:text-nord6 text-nord6/50 cursor-pointer" />
	</form>
</header>
