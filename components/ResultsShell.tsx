import Link from "next/link";

export default function ResultsShell({
  children,
  query,
  currentTab,
}: {
  children: React.ReactNode;
  query: string;
  currentTab: "default" | "music";
}) {
  return (
    <main className="lg:[margin-left:min(calc(20vw/2),10rem)] gap-6 grid grid-cols-1 p-6 max-w-3xl">
      <div className="border-nord2 border-b">
        <Link href="/" className="flex items-center gap-2 mb-6">
          ?<span className="text-nord6/50">{query}</span>
        </Link>

        <nav>
          <ul className="flex gap-6 pb-4">
            <li>
              <Link
                href={`/?q=${query}`}
                className={currentTab === "default"
                  ? ""
                  : "not-hover:opacity-50"}
              >
                web
              </Link>
            </li>
            <li>
              <Link
                href={`/music?q=${query}`}
                className={currentTab === "music" ? "" : "not-hover:opacity-50"}
              >
                music
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {children}
    </main>
  );
}
