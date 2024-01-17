"use strict";

import ErrorMessage from "./components/ErrorMessage.js";

// Selections
const inputYear = document.querySelector(".input-year");
const inputMonth = document.querySelector(".input-month");
const inputDay = document.querySelector(".input-day");

const ageYearEl = document.querySelector(".age-year");
const ageMonthEl = document.querySelector(".age-month");
const ageDayEl = document.querySelector(".age-day");

const form = document.querySelector(".form");

// Functions
function checkInputEligibility(input, type) {
  // Input empty
  if (input.value.trim() === "") {
    renderError(input, "This field is required");
    return false;
  }

  // Year input error
  if (type === "year") {
    if (+input.value > new Date().getFullYear()) {
      renderError(input, "Must be in the past");
      return false;
    }
  }

  // Month input error
  if (type === "month") {
    if (+input.value > 12) {
      renderError(input, "Must be a valid month");
      return false;
    }
  }

  // Day input error
  if (type === "day") {
    if (+input.value > 31) {
      renderError(input, "Must be a valid day");
      return false;
    }
  }

  // All eligible => Delete all errors and get date
  input.nextElementSibling?.remove();
  return +input.value;
}

function calcAge(year, month, day) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
    days += tempDate.getDate();
  }

  return { years, months, days };
}

function renderError(input, message) {
  const errorEl = input.nextElementSibling;
  if (errorEl) {
    errorEl.textContent = message;
    return;
  }

  input.insertAdjacentHTML("afterend", ErrorMessage(message));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const year = checkInputEligibility(inputYear, "year");
  const month = checkInputEligibility(inputMonth, "month");
  const day = checkInputEligibility(inputDay, "day");

  if (year && month && day) {
    const { days, months, years } = calcAge(year, month, day);

    ageYearEl.textContent = years;
    ageDayEl.textContent = `${days}`.padStart(2, 0);
    ageMonthEl.textContent = `${months}`.padStart(2, 0);
  }
});
