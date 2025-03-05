<script lang="ts">
  import { page } from "$app/state";

  import ResultsView from "$lib/components/ResultsView.svelte";

  const qParam = $derived(page.url.searchParams.get("q"));

  let { data }: { data: any } = $props();

  const tracks = data.data;

  function getTrackSearchQuery(track: any): string {
    return `${track.trackName} ${track.artistName}`;
  }

  function getTrackReleaseYear(track: any): string {
    return track.trackName ? track.releaseDate.split("-")[0] : "0";
  }

  function platformButton(name: string, url: string, trackSearchQuery: string) {
    return `
        <a
          href="${url}${trackSearchQuery}"
          target="_blank"
          class="bg-nord1 block rounded-md px-3 py-2 text-sm text-white hover:-translate-y-px"
        >
          <button>${name}</button>
        </a>
      `;
  }
</script>

<svelte:head>
  {#if tracks && tracks.length > 0}
    {@const firstTrack = tracks[0]}
    {@const trackReleaseYear = getTrackReleaseYear(firstTrack)}
    <title>{firstTrack.trackName}</title>
    <link rel="icon" type="image/x-icon" href={firstTrack.artworkUrl60} />
    <meta
      name="description"
      content={`${firstTrack.artistName}
              ${firstTrack.collectionName} 
              ${firstTrack.primaryGenreName} &bull; ${trackReleaseYear}
          `}
    />
    <meta name="og:image" content={firstTrack.artworkUrl100} />
  {/if}
</svelte:head>

{#if qParam}
  <ResultsView query={qParam}>
    {#each tracks as track}
      {#if track.trackName}
        {@const trackSearchQuery = getTrackSearchQuery(track)}
        {@const trackReleaseYear = getTrackReleaseYear(track)}

        <div class="grid grid-cols-[max-content,1fr] items-center gap-4">
          <img
            class="size-32 rounded"
            src={track.artworkUrl100}
            alt={`${track.trackName} album cover`}
          />
          <hgroup>
            <h2 class="m-0">{track.trackName}</h2>
            <p class="m-0">{track.artistName}</p>
            <p class="m-0">{track.collectionName}</p>
            <p class="m-0">
              {track.primaryGenreName} &bull; {trackReleaseYear}
            </p>
          </hgroup>
        </div>

        <div>
          <audio controls>
            <source src={track.previewUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div class="flex flex-wrap gap-2">
          {@html platformButton(
            "Spotify",
            "https://open.spotify.com/search/",
            trackSearchQuery,
          )}
          {@html platformButton(
            "Apple Music",
            "https://music.apple.com/us/search?term=",
            trackSearchQuery,
          )}
          {@html platformButton(
            "YouTube Music",
            "https://music.youtube.com/search?q=",
            trackSearchQuery,
          )}
          {@html platformButton(
            "YouTube",
            "https://www.youtube.com/results?search_query=",
            trackSearchQuery,
          )}
          {@html platformButton(
            "SoundCloud",
            "https://soundcloud.com/search?q=",
            trackSearchQuery,
          )}
          {@html platformButton(
            "Deezer",
            "https://www.deezer.com/search/",
            trackSearchQuery,
          )}
        </div>
      {:else}
        <h2>No song found :(</h2>
      {/if}
    {/each}
  </ResultsView>
{/if}
