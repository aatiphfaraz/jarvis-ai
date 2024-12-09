export function generateId(prefix = "") {
  const randomNum = Math.floor(Math.random() * 1000);
  return prefix + randomNum;
}

export const DRAWER_WIDTH = 240;
