/*
 * Function to convert a Date object to human friendly string
 * @param a string made from Date constructor
 * @return a string containing human friendly format DD/MM/YY HH:MM:SS TT
 */

export default function convertTime(time) {
  if (!time) return;
  const date = new Date(time);
  if (!date) return;

  // Getting day, month and year
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Getting hours and converting to 12h
  let hours = date.getHours();
  const isPM = hours > 11;
  if (isPM && hours !== 12) hours -= 12;
  if (hours < 10) hours = `0${hours}`;

  // Getting minutes and seconds
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let seconds = date.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  return `${day}/${month > 9 ? month : `0${month}`}/${year} ${hours}:${minutes}:${seconds} ${
    isPM ? "PM" : "AM"
  }`;
}
