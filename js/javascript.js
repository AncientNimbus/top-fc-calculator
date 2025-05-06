// TODO: Init calculator
function initCal(display) {
  console.log("Welcome!");

  allClear(display);
  setDisplayOutput(display, 0);
  console.log("Calculator initialized");
}

// TODO: Get value from inputs
function getBtnInput(display) {
  const cal = document.querySelector("#calculator");

  cal.addEventListener("click", (e) => {
    let target = e.target;

    const button = target.closest(".cal-btn");

    if (button) {
      const value = button.querySelector(".btn-txt").textContent;
      console.log(`Clicked ${value}`);
      setDisplayOutput(display, value);
    }
  });
}

// TODO: Display number
/**
 * @param {string} num
 */
function setDisplayOutput(display, num = "12345.678") {
  const numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  if (display.textContent === "0" && num != 0) {
    // Replace 0
    display.textContent = num in numeric ? num : "0.";
  } else if (display.textContent !== "0") {
    // Append number
    display.textContent += num;
  }
  console.log(`Output value: ${display.textContent}`);
}
// TODO: Save first number value
// TODO: Save operator value
// TODO: Save second number value
// TODO: e-notation conversion (large value)
// TODO: Single floating point support
// TODO: Percent conversion
// TODO: + ops
// TODO: - ops
// TODO: * ops
// TODO: / ops
// TODO: negate ops +-
// TODO: All Clear ops
function allClear(display) {
  display.textContent = 0;
  console.log("All value cleared!");
}
// TODO: Clear ops
// TODO: Keyboard support

// main
function main() {}

const output = document.querySelector("#output");
// let allClear = true;
let firstBuffer = 0;
let secondBuffer = 0;
let operator = "";

initCal(output);
getBtnInput(output);
