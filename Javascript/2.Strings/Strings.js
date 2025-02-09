"strict";

/*1: FUNCTION to Check String Input
 */

function is_string(str) {
  let input_type = typeof str;
  return input_type;
}
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 4, 0]));

/* FUNCTION to Check Blank String*/
function is_Blank(str) {
  let output = str === "" ? "Empty String" : "Not Empty string";
  return output;
}
console.log(is_Blank(""));
console.log(is_Blank("abc"));
