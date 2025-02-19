"use strict";

//step1: Fetching Data Asynchronously.

async function fetchData(callback) {
  const response = await fetch("http://localhost:3000/Books");
  const data = await response.json();
  console.log(data);
  callback(data);
}

//Step 2: Use Callbacks to Determine Special Book Criteria
function specialBooks(data) {
  const filteredByPage = data.filter((bookObj) => bookObj.pages > 500);
  console.log(filteredByPage);
}
fetchData(specialBooks);

//Step3: Apply Higher-Order Functions to Manipulate the Data

const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    pages: 281,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    pages: 328,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    pages: 180,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    pages: 279,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    year: 1951,
    pages: 234,
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    year: 1937,
    pages: 310,
  },
  {
    id: 7,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian",
    year: 1953,
    pages: 249,
  },
  {
    id: 8,
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    pages: 635,
  },
  {
    id: 9,
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    year: 1869,
    pages: 1225,
  },
  {
    id: 10,
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic Poetry",
    year: -800,
    pages: 541,
  },
];

// 1. Using .map() to create formatted book summaries
const formattedBooks = books.map(
  (book) =>
    `📖 ${book.title} by ${book.author} - ${book.genre} (${book.pages} pages)`
);
console.log("Formatted Books:", formattedBooks);

// 2. Using .filter() to find books published before 1950
const oldBooks = books.filter((book) => book.year < 1950);
console.log("Books published before 1950:", oldBooks);
