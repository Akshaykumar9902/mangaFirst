import cheerio from 'cheerio';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Make a request to the website
    const response = await axios.get('https://testolao.cvlindia.com/NewCustomer/34182B72801C72F/REFID/0/NA/NA/N/NA/NA/NA/NA/NA/NA/NA');

    
console.log('akshay', response);
    // Return the data as a JSON response
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}