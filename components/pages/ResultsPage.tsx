import { DdgResponse } from "@/lib/types";
import { LinkIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function stripTrailingSlash(str: string) {
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

export default function ResultsPage({
  result,
  query,
}: {
  result: DdgResponse;
  query: string;
}) {
  return (
    <>
      {!!result.Heading && <h1>{result.Heading}</h1>}

      {!!result.Abstract && (
        <aside className="flex md:flex-row flex-col gap-6">
          {!!result.Image && (
            <div className="md:order-1 mb-2 rounded shrink-0">
              <Zoom>
                <img
                  src={`https://duckduckgo.com${result.Image}`}
                  alt={result.Heading}
                  className="w-32 h-fit object-cover object-top"
                />
              </Zoom>
            </div>
          )}

          <p>{result.Abstract}</p>
        </aside>
      )}

      {!!result.Results?.length && (
        <>
          <h2 className="text-nord6/50">links</h2>

          <ul>
            {result.Results.map((result) => {
              if (result.FirstURL) {
                const url = new URL(result.FirstURL);
                return (
                  <li key={result.FirstURL} className="mb-6">
                    <a
                      href={result.FirstURL}
                      className="group flex items-center gap-2"
                    >
                      <LinkIcon className="size-4 shrink-0" />

                      <span className="group-hover:underline truncate">
                        {url.hostname.replace("www.", "") +
                          stripTrailingSlash(url.pathname)}
                      </span>
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}

      {result.RelatedTopics?.length ? (
        <>
          <h2 className="text-nord6/50">related queries</h2>

          <ul>
            {result.RelatedTopics.map((topic) => {
              if (!topic.FirstURL) {
                return null;
              }

              const q = topic.FirstURL.split("/")
                .reverse()[0]
                .replaceAll("_", "%20")
                .toLowerCase();

              if (decodeURIComponent(q) !== query) {
                return (
                  <li key={q} className="mb-6">
                    <Link
                      href={`/?q=${q}`}
                      className="group flex items-center gap-2"
                    >
                      <SearchIcon className="size-4 shrink-0" />
                      <div className="truncate">
                        <span className="group-hover:underline truncate">
                          {decodeURIComponent(q)}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </>
      ) : (
        <h3>No results found :(</h3>
      )}
    </>
  );
}
