<script lang="ts">
  let { response, query }: { response: any; query: string } = $props();
  import Search from "lucide-svelte/icons/search";
  import Link from "lucide-svelte/icons/link";

  function stripTrailingSlash(str: string) {
    return str.endsWith("/") ? str.slice(0, -1) : str;
  }
</script>

<svelte:head>
  {#if response.Abstract}
    <meta name="description" content={response.Abstract} />
    <title>{response.Heading ?? "Zook"}</title>
    <meta name="og:image" content={`https://duckduckgo.com${response.Image}`} />
  {/if}
</svelte:head>

{#if response.Heading}
  <h1>{response.Heading}</h1>
{/if}

{#if response.Abstract}
  <aside>
    <div class="flex flex-col gap-6 md:flex-row">
      {#if response.Image}
        <img
          src={`https://duckduckgo.com${response.Image}`}
          alt={response.Heading}
          class="mb-2 h-fit w-32 rounded object-cover object-top md:order-1"
        />
      {/if}

      <p>
        {response.Abstract}
      </p>
    </div>
  </aside>
{/if}

{#if response.Results.length}
  <h2 class="text-nord6/50">links</h2>

  <ul>
    {#each response.Results as result}
      {@const url = new URL(result.FirstURL)}
      {#if result.FirstURL}
        <li class="mb-6">
          <a href={result.FirstURL} class="group flex items-center gap-2">
            <Link class="size-4 shrink-0" />

            <span class="truncate group-hover:underline">
              {url.hostname.replace("www.", "") +
                stripTrailingSlash(url.pathname)}
            </span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
{/if}

{#if response.RelatedTopics.length}
  <h2 class="text-nord6/50">related queries</h2>

  <ul>
    {#each response.RelatedTopics as topic}
      {#if topic.FirstURL}
        {@const q = topic.FirstURL.split("/")
          .reverse()[0]
          .replaceAll("_", "%20")
          .toLowerCase()}
        {#if decodeURIComponent(q) !== query}
          <li class="mb-6">
            <a href={`/?q=${q}`} class="group flex items-center gap-2">
              <Search class="size-4 shrink-0" />
              <div class="truncate">
                <span class="truncate group-hover:underline">
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
