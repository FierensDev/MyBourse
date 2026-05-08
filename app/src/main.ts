import { fetchStocks } from "./api/stocks.ts";
import { renderChart } from "./charts/Chart.ts";
import { CHART_TYPE, DAYS_TO_SUBTRACT } from "./config/config.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";
import type { ChartConfig, ChartType } from "./models/Chart.ts";
import type { Stock } from "./models/Stock.ts";
import { displayButtonToSelectDayToSubtract, displayButtonToSelectStock, displayButtonToSelectTypeOfGraph, displayButtonToToggleTheme } from "./ui/button.ts";
import { displayGlobalMessage, displayMessage, hideGlobalMessage } from "./ui/message.ts";

const chartConfig: ChartConfig  = {
  selectedStocks: [],
  daysToSubtract: DAYS_TO_SUBTRACT[0].value,
  type: 'bar'
}

try {
  displayGlobalMessage('Chargements de l\'application...')
  const stocks = await fetchStocks();

  if(stocks){
    hideGlobalMessage();
    chartConfig.selectedStocks.push(stocks[0]);
    
    displayButtonToToggleTheme();
    displayButtonToSelectStock(stocks, chartConfig.selectedStocks[0].symbol, chartConfig);
    displayButtonToSelectTypeOfGraph(chartConfig.type, chartConfig);
    displayButtonToSelectDayToSubtract(chartConfig.daysToSubtract, chartConfig);
    
    renderChart(chartConfig);
  } else {
    displayMessage('error', 'Erreur serveur, veuillez revenir plus tard...')
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