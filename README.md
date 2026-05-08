# MyBourse

Application boursiere en typescript

## Installation


```
docker compose up --build
```

## Stack technique

- Vite
- Typescript
- Chart.js

## Fonctionnalités

Appel API REST via fetch
Utilisation de async/await
Typage strict avec TypeScript

Graphique (chart.js): 
- lisible
- dynamique
- changeable
- afficher une ou plusieurs actions boursières

l'utilisateur peut : 
- selectionner une action
- choisir une période

Interface générée et manipulée via le DOM (js/ts)

gestion des erreurs (réseau, api, données, utilisateur)(try,catch)

dark mode (gerer avec l'attribut data-theme dans la balise body)
export csv

## Structure

/api -> gestion des appels api  
/config/config.ts -> gestion des constantes (== .env)  
/errors -> gestion des erreurs  
/models -> interfaces et types  
/iu -> affichage  
/utils -> elements reutilisable  
