const MAX_LEN = 10;

export function generateId() {
  let id = "";
  const subset = "1234567890abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < MAX_LEN; i++) {
    id += subset[Math.floor(Math.random() * subset.length)];
  }
  return id;
}
