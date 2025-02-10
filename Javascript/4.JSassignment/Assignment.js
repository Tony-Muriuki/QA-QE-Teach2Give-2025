"strict";

/* Function To Reverse A String*/

function reverse_string(str) {
  let reversed_string = str.split("").reverse().join("");
  return reversed_string;
}
console.log(reverse_string("Reverse"));
