export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateDate = (day, month, year) => {
  if (
    day < 1 ||
    day > 31 ||
    month < 0 ||
    month > 11 ||
    year < 1930 ||
    year > 2023
  ) {
    return false;
  }

  const date = new Date(year, month, day);
  const time = date.getTime();

  if (
    isNaN(time) ||
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    return false;
  }

  return true;
};

export const validateMaxLength = (value, max, min = 0) => {
  return value.length <= max && value.length >= min;
};
