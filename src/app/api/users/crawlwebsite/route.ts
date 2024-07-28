import axios from 'axios';
import { NextResponse } from 'next/server';
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as path from "path";
import * as urlParser from "url";



export async function GET() {
  try {

    const seenUrls = {};
    const baseURL = 'https://manhuafast.net/manga/a-knight-with-a-time-limit/';

const getUrl = (link: string, host: string | null, protocol: string | null) => {
  if (link.includes("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url, ignore }) => {
  if (seenUrls[url]) return;
  console.log("crawling", url);
  seenUrls[url] = true;

  const { host, protocol, pathname } = urlParser.parse(url);

  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  const links = $("a")
    .map((i, link) => link.attribs.href)
    .get();

  const imageUrls = $("img")
    .map((i, link) => link?.attribs["data-src"])
    .get();

    var dir = 'images'+pathname;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }


 //console.log('akshay', imageUrls)
  imageUrls.forEach((imageUrl, index) => {
    axios({
      url: getUrl(imageUrl, host, protocol),
      method: 'GET',
      responseType: 'stream'
    }).then(response => {
      const filename = path.basename(imageUrl);
      const fullPath = `${dir}/${filename}`
      const dest = fs.createWriteStream(fullPath);
      response.data.pipe(dest);
      console.log('akshay', fullPath);
    });
  });

  links
    .filter((link) => link.includes(host) && link.includes(baseURL) && !link.includes(ignore))
    .forEach((link, index) => {
      setTimeout(() => {
        console.log("link", link, host, protocol, pathname);
        crawl({
          url: getUrl(link, host, protocol),
          ignore,
        });
      }, 2000 * index);
    });
};

crawl({
  url: baseURL,
  ignore: "/search",
});

    // Return the data as a JSON response
    return NextResponse.json({ data: 'success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}