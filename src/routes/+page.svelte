<script lang="ts">
  import { page } from "$app/state";

  import HomePage from "$lib/components/pages/HomePage.svelte";
  import ResultsPage from "$lib/components/pages/ResultsPage.svelte";

  import "@fontsource/inter";
  import "../app.css";

  const qParam = $state(page.url.searchParams.get("q"));

  let { data }: { data: any } = $props();
</script>

{#if !qParam}
  <HomePage />
{:else}
  <ResultsPage response={data.data} />
{/if}
