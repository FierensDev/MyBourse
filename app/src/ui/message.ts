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

export function displayGlobalMessage(message: string): void
{
  const app = document.getElementById('app')!;
  app.innerHTML = message;
}

export function hideGlobalMessage():void
{
  const app = document.getElementById('app')!;
  app.innerHTML = "";
}