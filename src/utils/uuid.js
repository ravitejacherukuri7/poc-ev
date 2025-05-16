export function generateId() {

  return `Charger-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
