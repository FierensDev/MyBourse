export function createElement(tag: string = 'div', id: string = '', className: string = ''): HTMLElement
{
  const element: HTMLElement = document.createElement(tag);
  element.id = id;
  element.className = className
  return element;
}

export function toggleTheme():void {
  document.body.dataset.theme = document.body.dataset.theme === "dark" ? "light" : "dark";
}