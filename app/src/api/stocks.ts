import { API_URL } from "../config/config.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "../errors/ApiErrors.ts";
import type { Stock } from "../models/Stock.ts";

export async function fetchStocks(): Promise<Stock[]>
{
  const res: Response = await fetch(API_URL);

  if(!res.ok){
    if(res.status === 401) throw new UnauthorizedError();
    if(res.status === 404) throw new NotFoundError();
    if(res.status >= 500) throw new ApiError();
    throw new NetworkError();
  }

  try {
    return await res.json() as Stock[];
  } catch {
    throw new ParseError();
  }
}