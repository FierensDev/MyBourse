import { fetchStocks } from "./api/stocks.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";
import type { Stock } from "./models/Stock.ts";

try {
  displayGlobalMessage('Chargements de l\'application...')
  const stocks = await fetchStocks();
  if(stocks){
    //create the div that contain button to choose stock to display
    displayButtonToSelectStock(stocks);
  }

} catch(e) {
  if (e instanceof UnauthorizedError) {
    displayGlobalMessage('Accès non autorisé');
  } else if (e instanceof NotFoundError) {
    displayGlobalMessage('Données introuvables');
  } else if (e instanceof ParseError) {
    displayGlobalMessage('Données reçu JSON invalide');
  } else if (e instanceof ApiError) {
    displayGlobalMessage('Erreur serveur.');
  } else if (e instanceof NetworkError) {
    displayGlobalMessage('Impossible de joindre le serveur.');
  } else {
    displayGlobalMessage('Revenez quand l\'api fonctionnera...');
  }
}

function displayGlobalMessage(message: string): void
{
  const app = document.getElementById('app')!;
  app.innerHTML = message;
}

function displayButtonToSelectStock(stocks: Stock[]): void
{
  const app = document.getElementById('app')!;
  const container = createElement('div', 'container_select_stock')
  
  stocks.forEach(stock => {
    console.log(`deunsLog : `, stock)
    const button = createElement('button', `stock_${stock.symbol}`)
    button.textContent = stock.name
    container.appendChild(button);
  })

  app.appendChild(container)
}

function createElement(tag: string = 'div', id: string = '', className: string = ''): HTMLElement
{
  const element: HTMLElement = document.createElement(tag);
  element.id = id;
  element.className = className
  return element;
}