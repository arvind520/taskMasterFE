export function setItemWithTTL(key, value, ttl) {
  const expirationTime = Date.now() + ttl;
  localStorage.setItem(key, JSON.stringify({ value, expirationTime }));
}

export function getItemWithTTLCheck(key) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  const { value, expirationTime } = JSON.parse(item);
  if (Date.now() > expirationTime) {
    localStorage.removeItem(key);
    return null;
  }

  return value;
}
