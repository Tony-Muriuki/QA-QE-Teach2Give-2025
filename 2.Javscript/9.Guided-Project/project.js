"use strict";

// Step 1: Fetch Data Asynchronously and Apply Callbacks
async function fetchData(callback) {
  try {
    const response = await fetch("http://localhost:3000/Books"); // Replace with actual API endpoint

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Books:", data);

    if (callback) callback(data); // Pass data to callback function
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Step 2: Function to Process Books
function processBooks(books) {
  // 1. Using .map() to create formatted book summaries
  const formattedBooks = books.map(
    (book) =>
      `📖 ${book.title} by ${book.author} - ${book.genre} (${book.pages} pages)`
  );
  console.log("Formatted Books:", formattedBooks);

  // 2. Using .filter() to find books published before 1950
  const oldBooks = books.filter((book) => book.year < 1950);
  console.log("Books published before 1950:", oldBooks);

  // 3. Using .sort() to arrange books by year (ascending)
  const sortedByYear = [...books].sort((a, b) => a.year - b.year);
  console.log("Books sorted by year:", sortedByYear);

  // 4. Using .sort() to arrange books by page count (descending)
  const sortedByPages = [...books].sort((a, b) => b.pages - a.pages);
  console.log("Books sorted by pages:", sortedByPages);
}

// Step 3: Fetch data and process it
fetchData(processBooks);
