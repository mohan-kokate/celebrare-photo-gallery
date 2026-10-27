export default function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photoId = action.payload;
      const alreadyFavourite = state.includes(photoId);

      if (alreadyFavourite) {
        return state.filter((id) => id !== photoId);
      }

      return [...state, photoId];
    }

    default:
      return state;
  }
}

export function getInitialFavourites() {
  try {
    const savedFavourites = localStorage.getItem("celebrare-favourites");
    const parsedFavourites = savedFavourites ? JSON.parse(savedFavourites) : [];

    return Array.isArray(parsedFavourites) ? parsedFavourites : [];
  } catch {
    return [];
  }
}
