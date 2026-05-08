import { fetchStocks } from "./api/stocks.ts";
import { renderChart } from "./charts/Chart.ts";
import { DAYS_TO_SUBTRACT } from "./config/config.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";
import type { ChartConfig } from "./models/Chart.ts";
import { displayButtonToExportCsv, displayButtonToSelectDayToSubtract, displayButtonToSelectStock, displayButtonToSelectTypeOfGraph, displayButtonToToggleTheme } from "./ui/button.ts";
import { displayGlobalMessage, displayMessage, hideGlobalMessage } from "./ui/message.ts";

const chartConfig: ChartConfig  = {
  selectedStocks: [],
  daysToSubtract: DAYS_TO_SUBTRACT[0].value,
  type: 'bar'
}

try {
  //affiche un message le temps de recuperer les data
  displayGlobalMessage('Chargements de l\'application...')
  const stocks = await fetchStocks();

  if(stocks){
    hideGlobalMessage();
    //ajoute un stock par defaut au premier affichage
    chartConfig.selectedStocks.push(stocks[0]);
    
    //affiche tous les buttons 
    displayButtonToToggleTheme();
    displayButtonToSelectStock(stocks, chartConfig.selectedStocks[0].symbol, chartConfig);
    displayButtonToSelectTypeOfGraph(chartConfig.type, chartConfig);
    displayButtonToSelectDayToSubtract(chartConfig.daysToSubtract, chartConfig);
    displayButtonToExportCsv(chartConfig);
    
    //affiche le graphique
    renderChart(chartConfig);
  } else {
    displayMessage('error', 'Erreur serveur, veuillez revenir plus tard...')
  }
} catch(e) {
  //gere plusieurs cas d'erreurs
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