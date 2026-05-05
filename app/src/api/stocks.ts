import { API_URL } from "../config/config.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "../errors/ApiErrors.ts";

export async function fetchStocks(){
  const res = await fetch(API_URL);

  if(!res.ok){
    if(res.status === 401) throw new UnauthorizedError();
    if(res.status === 404) throw new NotFoundError();
    if(res.status >= 500) throw new ApiError();
    throw new NetworkError();
  }

  let data;

  try {
    data = await res.json();
  } catch {
    throw new ParseError();
  }

  return data 
}