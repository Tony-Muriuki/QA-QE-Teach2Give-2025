"strict";

/*1: FUNCTION to check whether an 'input' is a STRING or NOT*/

function is_string(str) {
  let input_type = typeof str;
  return input_type;
}
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 4, 0]));
