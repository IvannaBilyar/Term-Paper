export const getPlaylists = async (id) => {
  try {
    const response = await fetch(`/usersPlaylist/${id}/list`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getPlaylistById = async (userId, id) => {
  try {
    const response = await fetch(`/usersPlaylist/${userId}/list/${id}`);

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const createPlaylist = async (data) => {
  try {
    const list = await getPlaylists(data.userId);
    if (list.find((listItem) => listItem.name === data.name)) {
      return {
        success: false,
        msg: "Плейлист вже існує",
      };
    }

    const res = await fetch(`/usersPlaylist/${data.userId}/list`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    return {
      success: res.status === 201 ? true : false,
      data: await res.json(),
      msg: res.status === 201 ? "Плейлист створено" : "Щось пішло не так",
    };
  } catch (e) {
    console.error(e);
    return { success: false, msg: "Щось пішло не так" };
  }
};

export const addToPlaylist = async (data) => {
  try {
    const list = await getSongsByPlaylist(data.listId);

    if (list.find((listItem) => listItem.id === data.song.id)) {
      return {
        success: false,
        msg: "Пісня вже існує в плейлисті",
      };
    }

    const res = await fetch(`/songs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song: data.song,
        listId: +data.listId,
      }),
    });

    return {
      success: res.status === 201 ? true : false,
      data: await res.json(),
      msg: res.status === 201 ? "Пісню додано" : "Щось пішло не так",
    };
  } catch (e) {
    console.error(e);
    return { success: false, msg: "Щось пішло не так" };
  }
};

export const removeFromPlaylist = async (id) => {
  try {
    const res = await fetch(`/songs/${id}`, {
      method: "DELETE",
    });

    return {
      success: res.status === 200 ? true : false,
      data: await res.json(),
      msg: res.status === 200 ? "Пісню видалено" : "Щось пішло не так",
    };
  } catch (e) {
    console.error(e);
    return { success: false, msg: "Щось пішло не так" };
  }
};

export const getSongsByPlaylist = async (listId) => {
  try {
    const res = await fetch(`/songs?listId=${listId}`);
    const songs = await res.json();

    return songs;
  } catch (e) {
    console.error(e);
    return { success: false, msg: "Щось пішло не так" };
  }
};
