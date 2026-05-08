//affihce un message au client qui se supprime apres 2s
export function displayMessage(type = 'default', message: string):void
{
  const messageDiv = document.getElementById('message')!;
  messageDiv.className = type === 'error' ? 'error' : ''
  messageDiv.innerHTML = message

  setTimeout(() => {
    messageDiv.innerHTML = ''
    messageDiv.className = '';
  }, 2000)
}

//cas ou l'utilisateur ne doit voir que le message (pas d'api)
export function displayGlobalMessage(message: string): void
{
  const app = document.getElementById('app')!;
  app.innerHTML = message;
}

//supprimer le message global pour afficher autre chose
export function hideGlobalMessage():void
{
  const app = document.getElementById('app')!;
  app.innerHTML = "";
}