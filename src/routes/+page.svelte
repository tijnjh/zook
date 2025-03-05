<script lang="ts">
  import { page } from "$app/state";

  import HomePage from "$lib/components/pages/HomePage.svelte";
  import ResultsPage from "$lib/components/pages/ResultsPage.svelte";
  import ResultsShell from "$lib/components/ResultsShell.svelte";

  import "@fontsource/inter";
  import "../app.css";

  const qParam = $derived(page.url.searchParams.get("q"));

  let { data }: { data: any } = $props();
</script>

{#if !qParam}
  <HomePage />
{:else}
  <ResultsShell query={qParam}>
    <ResultsPage response={data.data} query={qParam} />
  </ResultsShell>
{/if}
