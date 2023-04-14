export const getFavouritesSongs = async (ids) => {
  try {
    const response = await fetch(`/allSongs`);
    const data = await response.json();

    return data.filter((item) => ids.includes(item.id));
  } catch (e) {
    console.error(e);
  }
};

export const search = async (q, singerId) => {
  try {
    const response = await fetch(
      `/allSongs?q=${q}${singerId ? `&singerId=${singerId}` : ""}`
    );
    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
