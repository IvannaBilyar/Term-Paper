export const getSinger = async (id) => {
  try {
    const response = await fetch(`/top-singers/${id}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};


export const getSingerSongs = async (id) => {
  try {
    const response = await fetch(`/allSongs?singerId=${id}`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
