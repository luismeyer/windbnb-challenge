export function getRequiredElementById<T extends HTMLElement>(id: string) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing required Element with id ${id}`);
  }

  return element as T;
}
