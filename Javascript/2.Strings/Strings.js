"strict";

/*1: FUNCTION to Check String Input
 */

function is_string(str) {
  let input_type = typeof str;
  return input_type;
}
console.log(is_string("w3resource"));
console.log(is_string([1, 2, 4, 0]));

/*2: FUNCTION to Check Blank String*/
function is_Blank(str) {
  let output = str === "" ? "Empty String" : "Not Empty string";
  return output;
}
console.log(is_Blank(""));
console.log(is_Blank("abc"));

/*3: String to Array of Words*/
function string_to_array(str) {
  let array_to_string = str.split(" ");
  return array_to_string;
}
console.log(string_to_array("Robin Singh"));

/* 4. Extract Characters*/

function truncate_string(str, num) {
  let truncated_string = str.substring(str, num);
  return truncated_string;
}
console.log(truncate_string("Robin Singh", 4));

/*5. Abbreviate Name*/

function abbrev_name(str) {
  let abbreviated_name = str.trim().split(" ");
  if (abbreviated_name.length >= 2) {
    return abbreviated_name[0] + " " + abbreviated_name[1].charAt(0) + ".";
  }
  return abbreviated_name[0];
}

console.log(abbrev_name("Robin Singh")); // Output: "Robin S."

/*6. Hide Email Address*/
function protect_email(email) {
  let protected_email = email.split("_");
  if (protected_email.length >= 2) {
    return protected_email[0] + "..." + protected_email[1].slice(5);
  }
  return protected_email[0];
}
console.log(protect_email("robin_singh@example.com")); //
("robin...@example.com");

/*7. Parameterize String*/

function string_parameterize(str) {
  let parametized_str = str.toLowerCase().split(" ").join("-");
  return parametized_str;
}
console.log(string_parameterize("Robin Singh from USA.")); //"robin-singh-from-usa"

/*8. Capitalize First Letter*/

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize("js string exercises")); // "Js string exercises"

/*9: Capitalize Each Word*/

function capitalize_Words(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(capitalize_Words("js string exercises")); // "Js String Exercises"

/*10 Swap Case*/
function swapcase(str) {
  return str
    .split("")
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    )
    .join("");
}

console.log(swapcase("AaBbc")); //  "aAbBC"

/*11: Camelize String */

function camelize(str) {
  let camelized_str = str.split(" ").join("");
  return camelized_str;
}
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"

/* 12 Uncamelize String */

function uncamelize(str, separator = " ") {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === char.toUpperCase()) {
      result += separator + char.toLowerCase();
    } else {
      result += char;
    }
  }
  return result.charAt(0) === separator ? result.slice(1) : result;
}

console.log(uncamelize("helloWorld")); // "hello world"
console.log(uncamelize("helloWorld", "-")); // "hello-world"

/*13. Repeat String*/

function repeat(str, num) {
  if (num <= 0) return "";
  let repeated = "";
  for (let i = 0; i < num; i++) {
    repeated += str;
  }
  return repeated;
}

console.log(repeat("Ha!", 3)); // "Ha!Ha!Ha!"
