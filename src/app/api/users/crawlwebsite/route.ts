import cheerio from 'cheerio';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Make a request to the website
    const response = await axios.get('https://manhuafast.net/');

    // Parse the HTML content of the page
    const $ = cheerio.load(response.data);

    // Find all elements with the class '.c-sidebar.c-top-second-sidebar'
    const elements = $('.c-sidebar.c-top-second-sidebar');

    // Extract data from the elements
    const data: any[] = [];
    elements.each((index, element) => {
      // Extract specific data from the element, for example, text content
      const text = $(element).html();
      data.push(text);
    });

    // Return the data as a JSON response
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}