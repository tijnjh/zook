export async function load(e) {
  const query = e.url.searchParams.get("q");
  const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=5`;
  const response = await (await fetch(url)).json();
  return {
    data: response.results,
  };
}
