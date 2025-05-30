import ResultsPage from "@/components/pages/ResultsPage";
import ResultsShell from "@/components/ResultsShell";
import { DdgResponse } from "@/lib/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).q as string;

  if (query) {
    const url = `https://api.duckduckgo.com?q=${query}&format=json`;
    const data: DdgResponse = await (await fetch(url)).json();

    return (
      <ResultsShell currentTab="default" query={query}>
        <ResultsPage result={data} query={query} />
      </ResultsShell>
    );
  }

  return (
    <header>
      <form
        className="lg:[margin-left:min(calc(20vw/2),10rem)] flex gap-2 p-6 max-w-3xl"
        action="/"
      >
        <span className="text-nord6">?</span>
        <input
          id="q"
          type="text"
          name="q"
          placeholder="search the internet"
          className="bg-transparent outline-none placeholder:text-nord6/50 grow"
        />
        <input
          type="submit"
          value="search"
          className="text-nord6/50 hover:text-nord6 cursor-pointer"
        />
      </form>
    </header>
  );
}
