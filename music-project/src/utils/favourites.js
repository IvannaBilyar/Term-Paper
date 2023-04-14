export const getFavourites = () => {
  const favouritesStr = localStorage.getItem("favourites");
  const favourites = favouritesStr ? JSON.parse(favouritesStr) : [];

  return favourites;
};

export const isFavourite = (id) => {
  return getFavourites().includes(id);
};

export const setFavourites = (id) => {
  const favourites = getFavourites();
  let tempFavourites = [...favourites];
  if (favourites.includes(id)) {
    tempFavourites = tempFavourites.filter((favouriteId) => favouriteId !== id);
  } else {
    tempFavourites.push(id);
  }
  localStorage.setItem("favourites", JSON.stringify(tempFavourites));
};
