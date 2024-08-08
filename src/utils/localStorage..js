import { StorageKey } from "../constants/StorageKey";

export function getLocalStorageValue(key) {
  return localStorage.getItem(key);
}

export function saveToLocalStorage(key, value, movieId) {
  let item = getLocalStorageValue(key);

  item = item ? JSON.parse(item) : [];

  const itemIndex = item.findIndex((list) => list.id === movieId);

  if (itemIndex !== -1) {
    item.splice(itemIndex, 1);
  } else {
    item.push(value);
  }

  localStorage.setItem(key, JSON.stringify(item));
}

export const useLocalStorage = () => {
  const sessionId = getLocalStorageValue(StorageKey.SESSION_ID);
  const watchlist =
    JSON.parse(getLocalStorageValue(StorageKey.WATCHLIST)) || [];
  const favorites =
    JSON.parse(getLocalStorageValue(StorageKey.FAVORITES)) || [];

  return { sessionId, watchlist, favorites };
};
