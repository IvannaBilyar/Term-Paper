export function convertTime(time) {
  let minutes = Math.floor(~~((time % 3600) / 60));
  let seconds = Math.floor(time % 60);

  // Add leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return isNaN(time) ? "0:00" : `${minutes}:${seconds}`;
}

export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
}
