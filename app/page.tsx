import ResultsPage from "@/components/pages/ResultsPage";
import ResultsShell from "@/components/ResultsShell";
import { getResults } from "@/lib/ddg";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const query = (await searchParams).q as string;

  const { data, error } = await getResults(query);

  let metadata: Metadata = {
    title: "Zook",
  };

  if (!error) {
    metadata = {
      title: data.Heading ?? "Zook",
      description: data.Abstract,
      openGraph: {
        images: [`https://duckduckgo.com${data.Image}`],
      },
    };
  }

  return metadata;
}

export default async function Page({ searchParams }: Props) {
  const query = (await searchParams).q as string;

  if (query) {
    const { data, error } = await getResults(query);

    if (!error) {
      return (
        <ResultsShell currentTab="default" query={query}>
          <ResultsPage result={data} query={query} />
        </ResultsShell>
      );
    }

    return <div>Something went wrong! {error.message}</div>;
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
