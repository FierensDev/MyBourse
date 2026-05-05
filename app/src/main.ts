import { fetchStocks } from "./api/stocks.ts";
import { ApiError, NetworkError, NotFoundError, ParseError, UnauthorizedError } from "./errors/ApiErrors.ts";

try {
  displayGlobalMessage('Chargements de l\'application...')
  const data = await fetchStocks();
  console.log(`deunsLog : `, data)
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