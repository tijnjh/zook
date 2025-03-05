<script lang="ts">
  let { children, query }: { children: Snippet; query: string } = $props();
  import { type Snippet } from "svelte";

  import { page } from "$app/state";

  let path = $derived(page.url.pathname);
</script>

<main
  class="grid max-w-3xl grid-cols-1 gap-6 p-6 lg:[margin-left:min(calc(20vw/2),10rem)]"
>
  <div class="border-nord2 border-b">
    <a href="/" class="mb-6 flex items-center gap-2">
      ?
      <span class="text-nord6/50">
        {query}
      </span>
    </a>

    <nav>
      <ul class="flex gap-6 pb-4">
        <li>
          <a
            href={`/?q=${query}`}
            class={!!(path === "/") ? "" : "not-hover:opacity-50"}
          >
            web
          </a>
        </li>
        <li>
          <a
            href={`/music?q=${query}`}
            class={!!(path === "/music") ? "" : "not-hover:opacity-50"}
          >
            music
          </a>
        </li>
      </ul>
    </nav>
  </div>

  {@render children()}
</main>
