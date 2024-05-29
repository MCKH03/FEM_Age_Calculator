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
//// ! Initial values of inputs
inputYear.value = "";
inputMonth.value = "";
inputDay.value = "";

// Functions
function checkInputEligibility(input, type) {
  //// ! Initial values of age
  ageYearEl.textContent = "--";
  ageMonthEl.textContent = "--";
  ageDayEl.textContent = "--";

  // Input empty
  if (input.value.trim() === "") {
    renderError(input, "This field is required");
    return false;
  }

  // Year input error //// ! (edited)
  if (type === "year" && +input.value < 100) {
    renderError(input, `Must be from 100 to ${new Date().getFullYear()}`);
    return false;
  }

  // Month input error //// ! (edited)
  if (type === "month" && (+input.value > 12 || +input.value < 1)) {
    renderError(input, "Must be a valid month");
    return false;
  }

  // Day input error //// ! (edited)
  if (type === "day" && (+input.value > 30 || +input.value < 1)) {
    renderError(input, "Must be a valid day");
    return false;
  }

  //// ! 1- Future date error (added)
  if (+inputYear.value > new Date().getFullYear()) {
    inputMonth.nextElementSibling?.remove();
    inputDay.nextElementSibling?.remove();
    renderError(
      inputYear,
      `This is future date, must be from 100 to ${new Date().getFullYear()}`
    );
    return false;
  }

  if (
    +inputYear.value === new Date().getFullYear() &&
    +inputMonth.value > new Date().getMonth() + 1 &&
    +inputMonth.value <= 12
  ) {
    inputYear.nextElementSibling?.remove();
    inputDay.nextElementSibling?.remove();
    renderError(
      inputMonth,
      `This is future date, must be from 1 to ${new Date().getMonth() + 1}`
    );
    return false;
  }

  //// ! 1- Future date error (added)
  if (
    +inputYear.value === new Date().getFullYear() &&
    +inputMonth.value === new Date().getMonth() + 1 &&
    +inputDay.value > new Date().getDate()
  ) {
    inputYear.nextElementSibling?.remove();
    inputMonth.nextElementSibling?.remove();
    renderError(
      inputDay,
      `This is future date, must be from 1 to ${new Date().getDate()}`
    );
    return false;
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

  // Checking the negativity of the months value
  if (months < 0) {
    years--;
    months += 12;
  }
  // Checking the negativity of the days value
  if (days < 0) {
    months--;
    const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
    days += tempDate.getDate();
    //// ! Checking the negativity of the months value (added)
    if (months < 0) {
      years--;
      months += 12;
    }
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

    ageYearEl.textContent = `${years}`.padStart(2, 0);
    ageDayEl.textContent = `${days}`.padStart(2, 0);
    ageMonthEl.textContent = `${months}`.padStart(2, 0);
  }
});
