"strict";

/* 2:Function To Reverse A String*/

function reverse_string(str) {
  let reversed_string = str.split("").reverse().join("");
  return reversed_string;
}
console.log(reverse_string("Reverse"));

/*5: Remove Duplicates from a String*/
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

/*8:Case Insensitive Palindrome*/

function isCaseInsesitivePalindrome(str) {
  let palindrome_check = str.toLowerCase();
  let reversed_str = palindrome_check.split("").reverse().join("");
  return palindrome_check === reversed_str;
}
console.log(isCaseInsesitivePalindrome("Aba"));
console.log(isCaseInsesitivePalindrome("Racecar"));
console.log(isCaseInsesitivePalindrome("Palindrome"));

/*1:Check if a String is a Palindrome*/
function isPalindrome(str) {
  let cleaned_str = str
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll(",", "")
    .replaceAll("?", "")
    .replaceAll("!", "");
  let reversed = cleaned_str.split("").reverse().join("");
  return cleaned_str === reversed;
}

console.log(isPalindrome("A man, a plan, a canal, Panama"));
console.log(isPalindrome("Was it a car or a cat i saw ?"));
console.log(isPalindrome("Hello World!"));

/*4. Check if Two Strings are Anagrams*/

function areAnagrams(str1, str2) {
  let sortedStr1 = str1.toLowerCase().split("").sort().join("");
  console.log(sortedStr1);
  let sortedStr2 = str2.toLowerCase().split("").sort().join("");
  console.log(sortedStr2);
  return sortedStr1 === sortedStr2;
}
console.log(areAnagrams("Listen", "Silent"));

/* 3. Find the Longest Palindromic Substring*/

function longestPalindromicSubstring(s) {
  const s1 = s.split("");
  const s2 = s.split("").reverse();
  let arr = [];
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] == s2[i]) {
      arr.push(s1[i]);
    } else {
      continue;
    }
  }
  return arr.join("");
}
console.log(longestPalindromicSubstring("babad"));
console.log(longestPalindromicSubstring("cbbd"));
