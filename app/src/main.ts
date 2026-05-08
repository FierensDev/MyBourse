import { fetchStocks } from "./api/stocks.ts";
import { renderChart } from "./charts/Chart.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";
import type { Stock } from "./models/Stock.ts";

//
const chartConfig: {
  stock: Stock | null,
  days: number,
  type: string
} = {
  stock: null,
  days: 7,
  type: 'bar'
}

try {
  displayGlobalMessage('Chargements de l\'application...')
  const stocks = await fetchStocks();
  console.log(`deunsLog : `, stocks)
  if(stocks){
    hideGlobalMessage();
    chartConfig.stock = stocks[0];
    displayButtonToSelectStock(stocks, chartConfig.stock.symbol);
    // displayButtonToSelectTypeOfGraph(stocks, selectedStockSymbol);
    
    renderChart(selectedStock, 'bar', 31);
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

function displayButtonToSelectStock(stocks: Stock[], selectedStockSymbol: string | null): void
{
  const app = document.getElementById('app')!;
  const container = createElement('div', 'container_select_stock')
  
  stocks.forEach(stock => {
    // console.log(`deunsLog : `, stock)
    let isActive = stock.symbol === selectedStockSymbol ? 'active' : '';
    const button = createElement('button', `stock_${stock.symbol}`, `select_stock ${isActive}`)
    button.textContent = stock.name
    button.dataset.symbol = stock.symbol

    button.addEventListener('click',() => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      selectedStock = stocks.find(s => s.symbol === button.dataset.symbol) ?? null
      renderChart(selectedStock, 'bar', 7);
    })

    container.appendChild(button);
  })

  app.appendChild(container)
}

function displayGlobalMessage(message: string): void
{
  const app = document.getElementById('app')!;
  app.innerHTML = message;
}

function hideGlobalMessage():void
{
  const app = document.getElementById('app')!;
  app.innerHTML = "";
}

function createElement(tag: string = 'div', id: string = '', className: string = ''): HTMLElement
{
  const element: HTMLElement = document.createElement(tag);
  element.id = id;
  element.className = className
  return element;
}