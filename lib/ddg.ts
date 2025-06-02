import { effetch } from "tsuite";
import { DdgResponse } from "./types";
import { tryCatch } from "typecatch";

export async function getResults(query: string) {
  const url = `https://api.duckduckgo.com?q=${query}&format=json`;
  const response = await tryCatch(effetch<DdgResponse>(url));
  return response;
}
