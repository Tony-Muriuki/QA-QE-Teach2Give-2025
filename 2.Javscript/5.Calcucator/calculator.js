"use strict";

const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (event) => {
  const target = event.target;
  const action = target.dataset.action;

  if (!action) return; // Ignore clicks outside buttons

  if (action === "clear") {
    display.value = "";
  } else if (action === "calculateResult()") {
    try {
      display.value = eval(display.value); // Simple evaluation (use with caution)
    } catch {
      display.value = "Error";
    }
  } else if (action.includes("appendValue")) {
    let value = action.split("('")[1].split("')")[0]; // Extract value in a simpler way
    display.value += value;
  }
});
