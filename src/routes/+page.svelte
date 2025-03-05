<script lang="ts">
  import { page } from "$app/state";

  import ResultsPage from "$lib/components/pages/ResultsPage.svelte";
  import ResultsShell from "$lib/components/ResultsView.svelte";

  const qParam = $derived(page.url.searchParams.get("q"));

  let { data }: { data: any } = $props();
</script>

{#if !qParam}
  <header>
    <form
      class="flex max-w-3xl gap-2 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]"
      action="/"
    >
      <span class="text-nord6">?</span>
      <input
        id="q"
        type="text"
        name="q"
        placeholder="search the internet"
        class="placeholder:text-nord6/50 grow bg-transparent outline-none"
      />
      <input
        type="submit"
        value="search"
        class="hover:text-nord6 text-nord6/50 cursor-pointer"
      />
    </form>
  </header>
{:else}
  <ResultsShell query={qParam}>
    <ResultsPage response={data.data} query={qParam} />
  </ResultsShell>
{/if}
