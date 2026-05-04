// import { API_URL } from "../config/config";

import { API_URL } from "../config/config.ts";

export async function fetchStocks(){
  const response = await fetch(API_URL);

  if(!response.ok){
    throw new Error('no data');
  }

  console.log(`deunsLog : `, response.ok)
}