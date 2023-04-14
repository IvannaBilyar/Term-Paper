export const getTopSingers = async () => {
  try {
    const response = await fetch(`/top-singers`);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};
