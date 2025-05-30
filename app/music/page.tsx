import ResultsShell from "@/components/ResultsShell";
import { DdgResponse } from "@/lib/types";
import { searchItunes } from "node-itunes-search";
import { Fragment } from "react";

function getTrackSearchQuery(track: any): string {
  return `${track.trackName} ${track.artistName}`;
}

function getTrackReleaseYear(track: any): string {
  return track.trackName ? track.releaseDate.split("-")[0] : "0";
}

export default async function Music({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).q as string;

  if (query) {
    const { results: tracks } = await searchItunes({
      term: query,
      media: "music",
      entity: "song",
      limit: "5",
    });

    return (
      <ResultsShell query={query} currentTab="music">
        {tracks.map((track) =>
          track.trackName ? (
            (() => {
              const trackSearchQuery = getTrackSearchQuery(track);
              const trackReleaseYear = getTrackReleaseYear(track);

              return (
                <Fragment key={track.trackId}>
                  <div className="items-center gap-4 grid grid-cols-[max-content,1fr]">
                    <img
                      className="rounded size-32"
                      src={track.artworkUrl100}
                      alt={`${track.trackName} album cover`}
                    />
                    <hgroup>
                      <h2 className="m-0">{track.trackName}</h2>
                      <p className="m-0">{track.artistName}</p>
                      <p className="m-0">{track.collectionName}</p>
                      <p className="m-0">
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

                  <div className="flex flex-wrap gap-2">
                    <PlatformButton
                      name="Spotify"
                      url="https://open.spotify.com/search/"
                      trackSearchQuery={trackSearchQuery}
                    />
                    <PlatformButton
                      name="Apple Music"
                      url="https://music.apple.com/us/search?term="
                      trackSearchQuery={trackSearchQuery}
                    />
                    <PlatformButton
                      name="YouTube Music"
                      url="https://music.youtube.com/search?q="
                      trackSearchQuery={trackSearchQuery}
                    />
                    <PlatformButton
                      name="YouTube"
                      url="https://www.youtube.com/results?search_query="
                      trackSearchQuery={trackSearchQuery}
                    />
                    <PlatformButton
                      name="SoundCloud"
                      url="https://soundcloud.com/search?q="
                      trackSearchQuery={trackSearchQuery}
                    />
                    <PlatformButton
                      name="Deezer"
                      url="https://www.deezer.com/search/"
                      trackSearchQuery={trackSearchQuery}
                    />
                  </div>
                </Fragment>
              );
            })()
          ) : (
            <h3>No song found :(</h3>
          )
        )}
      </ResultsShell>
    );
  }
}

function PlatformButton({
  name,
  url,
  trackSearchQuery,
}: {
  name: string;
  url: string;
  trackSearchQuery: string;
}) {
  return (
    <a
      href={`${url}${trackSearchQuery}`}
      target="_blank"
      className="block bg-nord1 px-3 py-2 rounded-md text-white text-sm hover:-translate-y-px"
    >
      <button>{name}</button>
    </a>
  );
}
