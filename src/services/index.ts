import { ERROR_CODE } from "@/lib";
import { Wiki } from "@quority/fandom";
import parseUrl from "parse-url";

export interface WikiParams {
  wiki: string;
  lang: string;
  page: string;
}

export function parseFandomUrl(url: string): WikiParams {
  const { host, pathname } = parseUrl(url);
  const wikiNameMatch = host.match(/([^.]+)\.fandom\.com/i);
  if (!wikiNameMatch) {
    throw ERROR_CODE.INVALID_URL;
  }
  const wiki = wikiNameMatch[1];
  const langAndPageMatch = pathname.match(/\/([^/]+)\/wiki\/([^/?]+)/);
  if (!langAndPageMatch) {
    throw ERROR_CODE.INVALID_URL;
  }
  const [, lang, page] = langAndPageMatch;
  return {
    wiki,
    lang,
    page,
  };
}

export async function getPage({ wiki, lang, page }: WikiParams) {
  const community = new Wiki({ api: `${lang}.${wiki}` });
  const content = await community.getPage(decodeURIComponent(page));
  return content;
}
