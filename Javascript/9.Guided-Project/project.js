"use strict";

//Fetching Data Asynchronously.

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
