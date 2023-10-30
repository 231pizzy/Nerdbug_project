// utils/localStorage.js
export const saveNotesToLocalStorage = (key, notes) => {
  localStorage.setItem(key, JSON.stringify(notes));
};

export const loadNotesFromLocalStorage = (key) => {
  const storedNotes = localStorage.getItem(key);
  return storedNotes ? JSON.parse(storedNotes) : "";
};

export const saveFavoritesToLocalStorage = (key, favorites) => {
  localStorage.setItem(key, JSON.stringify(favorites));
};

export const loadFavoritesFromLocalStorage = (key) => {
  const storedFavorites = localStorage.getItem(key);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};
