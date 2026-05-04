import { fetchStocks } from "./api/stocks.ts";

try {
  displayGlobalMessage('Chargements de l\'application...')
  await fetchStocks();
} catch(e) {
  displayGlobalMessage('Revenez quand l\'api fonctionnera...');
}

function displayGlobalMessage(message: string)
{
  const app = document.getElementById('app')!;
  app.innerHTML = message;
}