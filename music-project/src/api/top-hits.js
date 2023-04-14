export const getTopHits = async () => {
  try {
    const response = await fetch(`/top-hits?_expand=allSongs`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
