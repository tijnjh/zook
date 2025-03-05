<script lang="ts">
  let { children, query }: { children: Snippet; query: string } = $props();
  import { type Snippet } from "svelte";
</script>

<main
  class="grid max-w-3xl grid-cols-1 gap-6 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]"
>
  <a href="/" class="mb-6 flex items-center gap-2">
    ?
    <span
      class="text-nord6/50"
      style={`view-transition-name: ${query.replaceAll(" ", "_")}`}
    >
      {query}
    </span>
  </a>

  {@render children()}
</main>
