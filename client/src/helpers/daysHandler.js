import { days } from "config.json";

/*
 * This function takes an array containing days of the week
 * and returns a compact 8 bit integer for easy storage
 * Mon = 1, Tue = 2, .... Sat = 32, Sun = 64
 * @param an array containing strings representing days of the week
 * @return an 8 bit integer representing the strings
 */

export const arrayToBinary = (array) => {
  const boolArray = days.map((d) => array.includes(d)).reverse();
  const binary = boolArray.reduce((res, x) => (res << 1) | x);
  return binary;
};

/*
 * This function takes an 8 bit integer made by arrayToBinary()
 * and returns an array containing strings of days of the week in human readable format
 * Mon = 1, Tue = 2, .... Sat = 32, Sun = 64
 * @param an 8 bit integer representing the strings
 * @return an array containing strings representing days of the week
 */

export const binaryToArray = (binary) => {
  let boolArray = [];
  while (binary) {
    boolArray.push((binary & 1) === 1);
    binary >>= 1;
  }
  const array = days.filter((_, index) => boolArray[index]);
  return array;
};
