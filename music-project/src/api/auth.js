export const getUser = async (email) => {
  try {
    const response = await fetch(`/users?email=${email}`);
    const data = await response.json();
    return data?.[0];
  } catch (e) {
    console.error(e);
  }
};

export const signIn = async (data) => {
  try {
    const response = await fetch(
      `/users?email=${data.email}&password=${data.password}`
    );
    const res = await response.json();
    if (res?.[0]) {
      localStorage.setItem("userEmail", res[0].email);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        msg: "Невірні дані",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      msg: "Щось пішло не так",
    };
  }
};

export const signUp = async (data) => {
  try {
    const userRes = await fetch(`/users?email=${data.email}`);
    const user = await userRes.json();

    if (user?.length) {
      return {
        success: false,
        msg: "Користувач вже існує",
      };
    }

    const res = await fetch(`/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    localStorage.setItem("userEmail", data.email);

    return {
      success: res.status === 201 ? true : false,
      data: await res.json(),
      msg:
        res.status === 201 ? "Реєстрація пройшла успішно" : "Щось пішло не так",
    };
  } catch (e) {
    console.error(e);
    return { success: false, msg: "Щось пішло не так" };
  }
};
