function getLocalStorageValue(key) {
  const value = localStorage.getItem(key);
  return value;
}

export default getLocalStorageValue;
