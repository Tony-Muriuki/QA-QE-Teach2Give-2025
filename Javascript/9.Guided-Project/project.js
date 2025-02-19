"use strict";

async function fetchData(callback) {
  const response = await fetch("http://localhost:3000/Books");
  const data = await response.json();
  console.log(data);
  callback(data);
}
