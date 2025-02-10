"strict";

/* Function To Reverse A String*/

function reverse_string(str) {
  let reversed_string = str.split("").reverse().join("");
  return reversed_string;
}
console.log(reverse_string("Reverse"));

/* Remove Duplicates from a String*/
function remove_duplicate(str) {
  let uniquestr = "";
  for (let char of str) {
    if (!uniquestr.includes(char)) {
      uniquestr += char;
    }
  }
  return uniquestr;
}
console.log(remove_duplicate("Programming"));
console.log(remove_duplicate("Hello world"));

/*Case Insensitive Palindrome*/

function isCaseInsesitivePalindrome(str) {
  let palindrome_check = str.toLowerCase();
  let reversed_str = palindrome_check.split("").reverse().join("");
  return palindrome_check === reversed_str;
}
console.log(isCaseInsesitivePalindrome("Aba"));
console.log(isCaseInsesitivePalindrome("Racecar"));
console.log(isCaseInsesitivePalindrome("Palindrome"));
