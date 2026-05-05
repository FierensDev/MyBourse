export class UnauthorizedError extends Error {
  constructor(){
    super(`Vous n'êtes pas autorisé à accéder à cette ressource`);
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends Error {
  constructor(){
    super(`Aucune ressource trouvé a cette url`);
    this.name = 'NotFoundError'
  }
}

export class ApiError extends Error {
  constructor(){
    super(`Impossible de joindre l'api`);
    this.name = 'ApiError'
  }
}

export class NetworkError extends Error {
  constructor(){
    super(`Impossible de joindre l'api`);
    this.name = 'NetworkError'
  }
}

export class ParseError extends Error {
  constructor(){
    super(`La réponse n'est pas du JSON valide`);
    this.name = 'ParseError'
  }
}