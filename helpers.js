export function generateId() {
  const starterWords = ["journal", "note", "text"];
  return `${
    starterWords[Math.trunc(Math.random() * 3)] +
    Math.trunc(Math.random() * 100000)
  }`;
}
