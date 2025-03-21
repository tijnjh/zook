export async function load(e) {
  const query = e.url.searchParams.get("q");
  const url = `https://api.duckduckgo.com?q=${query}&format=json`;
  const response = await (await fetch(url)).json();
  return {
    data: response,
  };
}
