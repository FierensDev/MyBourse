import { fetchStocks } from "./api/stocks.ts";
import { renderChart } from "./charts/Chart.ts";
import { CHART_TYPE, DAYS_TO_SUBTRACT } from "./config/config.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";
import type { ChartConfig, ChartType } from "./models/Chart.ts";
import type { Stock } from "./models/Stock.ts";

const chartConfig: ChartConfig  = {
  selectedStock: null,
  daysToSubtract: DAYS_TO_SUBTRACT[0].value,
  type: 'bar'
  
}

try {
  displayGlobalMessage('Chargements de l\'application...')
  const stocks = await fetchStocks();

  if(stocks){
    hideGlobalMessage();
    chartConfig.selectedStock = stocks[0];
    
    displayButtonToSelectStock(stocks, chartConfig.selectedStock.symbol);
    displayButtonToSelectTypeOfGraph(chartConfig.type);
    displayButtonToSelectDayToSubstract(chartConfig.daysToSubtract);
    
    renderChart(chartConfig);
  }

} catch(e) {
  if (e instanceof UnauthorizedError) {
    displayGlobalMessage('Accès non autorisé... Revenez plus tard');
  } else if (e instanceof NotFoundError) {
    displayGlobalMessage('Données introuvables... Revenez plus tard');
  } else if (e instanceof ParseError) {
    displayGlobalMessage('Données reçu JSON invalide... Revenez plus tard');
  } else if (e instanceof ApiError) {
    displayGlobalMessage('Erreur serveur... Revenez plus tard');
  } else if (e instanceof NetworkError) {
    displayGlobalMessage('Impossible de joindre le serveur... Revenez plus tard');
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
      chartConfig.selectedStock = stocks.find(s => s.symbol === button.dataset.symbol) ?? null
      renderChart(chartConfig);
    })

    container.appendChild(button);
  })
  app.appendChild(container)
}

function displayButtonToSelectTypeOfGraph(selectedType: ChartType): void
{
  const app = document.getElementById('app')!;
  const container = createElement('div', 'container_select_type_of_graph')
  
  CHART_TYPE.forEach(type => {
    let isActive = type === selectedType ? 'active' : '';
    const button = createElement('button', `type_${type}`, `select_type ${isActive}`)
    button.textContent = type
    
    button.addEventListener('click',() => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      chartConfig.type = type
      renderChart(chartConfig);
    })

    container.appendChild(button);
  })
  app.appendChild(container)
}

function displayButtonToSelectDayToSubstract(daysSubstracted: number): void
{
  const app = document.getElementById('app')!;
  const container = createElement('div', 'container_select_day_to_substract')
  
  DAYS_TO_SUBTRACT.forEach(day => {
    let isActive = day.value === daysSubstracted ? 'active' : '';
    const button = createElement('button', `type_${day.value}`, `select_day_to_substract ${isActive}`)
    button.textContent = day.label
    
    button.addEventListener('click',() => {
      container.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      chartConfig.daysToSubtract = day.value
      renderChart(chartConfig);
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