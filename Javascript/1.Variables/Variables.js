"strict";

/***************************VARIABLES JAVASCRIPT DAY 4 ASSIGNMENT ANSWERS***************************/

//1. Declare a variable age using let and assign it the value 25.

let age = 25;

// 2.​ Declare a variable schoolName using const and assign it "Greenwood High".

const schoolName = "Greenwood High";

//3.​ Declare an empty array called studentsList.

const studentsList = [];

//4.​ What is the difference between let, const, and var when declaring variables?

let declaration_let = "Used to declare variables that are mutable";

const declaration_const = "Used to declare variables that are immutable";

var declaration_var = "Old way of declaraing variables before let and const";

//Which of the following variable names is invalid?​

// let 1stPlace = "John";

//5.​Why is the following variable name incorrect?​ const #taxRate = 0.16;

let answer =
  "The variable Declaration does not follow the naming convention that it should only start with a dollar sign";

//6.​Rewrite this variable name to follow best practices:   ​let MyvariableNAME = "JavaScript";

let myVariableName = "JavaScript";

// 3: What will be the output of the following?​

console.log(typeof "Hello"); //String
console.log(typeof 99); // Number
console.log(typeof true); //Boolean
console.log(typeof undefined); // Undefined

//​Identify the data types in this array:​
let data = ["Kenya", 34, false, { country: "USA" }, null];

console.log(typeof data[0]); //String
console.log(typeof data[1]); //Number
console.log(typeof data[2]); // Boolean
console.log(typeof data[3]); // Object
console.log(typeof data[4]); // Object

// 11.​Create an object person with properties name, age, and city.

let person = {
  name: "Tony",
  age: 21,
  city: "Nyeri",
};

//12.​Add a new property email to the person object.

person.email = "kamandetonymuriuki@gmail.com";

//13.​Declare an array fruits with three fruit names.

let fruits = ["Apple", "Mango", "Watermelon"];

//14.​Access the second item in the fruits array.

let fruit2 = fruits[1];

//15.​What will be the output of the following?

console.log("5" + 2); //52
console.log("5" - 2); //3

// 16.​Convert the string "100" into a number.

let number = Number("100");

//17.​Convert the number 50 into a string.

let string = String(50);

//18.​What will be the result of this operation?

console.log(5 + true); //6
