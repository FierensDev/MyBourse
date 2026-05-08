import { renderChart } from "../charts/Chart";
import { CHART_TYPE, DAYS_TO_SUBTRACT } from "../config/config";
import type { ChartConfig, ChartType } from "../models/Chart";
import type { Stock } from "../models/Stock";
import { createElement } from "../utils/dom";
import { displayMessage } from "./message";


export function displayButtonToSelectStock(stocks: Stock[], selectedStockSymbol: string | null, chartConfig: ChartConfig): void
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
    
      if(button.classList.contains('active') && container.querySelectorAll('button.active').length === 1){
        displayMessage('error', 'Vous devez selectionner au moin une action')
        return;
      }

      if(button.classList.contains('active')){
        chartConfig.selectedStocks = chartConfig.selectedStocks.filter(s => s.symbol !== stock.symbol)
        button.classList.remove('active')
      } else {
        chartConfig.selectedStocks.push(stock)
        button.classList.add('active');
      }

      renderChart(chartConfig);
    })

    container.appendChild(button);
  })
  app.appendChild(container)
}

export function displayButtonToSelectTypeOfGraph(selectedType: ChartType, chartConfig: ChartConfig): void
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

export function displayButtonToSelectDayToSubtract(daysSubtracted: number, chartConfig: ChartConfig): void
{
  const app = document.getElementById('app')!;
  const container = createElement('div', 'container_select_day_to_subtract')
  
  DAYS_TO_SUBTRACT.forEach(day => {
    let isActive = day.value === daysSubtracted ? 'active' : '';
    const button = createElement('button', `type_${day.value}`, `select_day_to_subtract ${isActive}`)
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

export function displayButtonToToggleTheme():void 
{
  const button = createElement('button', 'toggle_theme');
  button.textContent =  document.body.dataset.theme === 'dark' ? 'dark' : 'light'
  
  button.addEventListener('click', () => {
    const isDark = document.body.dataset.theme === 'dark' 
    document.body.dataset.theme = isDark ? 'light' : 'dark'
    button.textContent = isDark ? 'light' : 'dark'
  })
  
  document.body.appendChild(button);
}