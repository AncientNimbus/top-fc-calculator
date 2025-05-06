const numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const output = document.querySelector("#output");
let firstBuffer = 0;
let secondBuffer = 0;
let operator = "";

// Init calculator
function initCal(display) {
  console.log("Welcome!");

  allClear(display);
  insertNumber(display, 0);
  console.log("Calculator initialized");
}

// Get value from inputs
function getBtnInput(display) {
  const cal = document.querySelector("#calculator");

  cal.addEventListener("click", (e) => {
    let target = e.target;

    const button = target.closest(".cal-btn");

    if (button) {
      const value = button.querySelector(".btn-txt").textContent;
      //   console.log(button);

      if (button.matches(".ops")) {
        // Trigger cal function
        console.log(button.id);
        runOps(button.id);
      } else {
        // Insert Number
        insertNumber(display, value);
      }
    }
  });
}

// TODO: Display number
/**
 * @param {HTMLDivElement} display
 * @param {string} num
 */
function insertNumber(display, num = "12345.678") {
  const prevValue = Number(display.textContent);
  let currentValue = prevValue;
  if (display.textContent === "0" && num != 0) {
    // Replace 0
    display.textContent = num in numeric ? num : "0.";
    currentValue = Number(display.textContent);
  } else if (display.textContent !== "0") {
    // Append number
    display.textContent += num;
    currentValue = Number(display.textContent);
  }

  console.log(`Output value: ${currentValue}`);
}
// TODO: Save first number value
function saveToBuffer(value) {}
// TODO: Save operator value
// TODO: Save second number value
// TODO: e-notation conversion (large value)
// TODO: Single floating point support
// TODO: Percent conversion
function runOps(opsName) {
  switch (opsName) {
    case "cmd-ac":
      allClear(output);
      break;
    case "cmd-negate":
      break;
    case "cmd-percent":
      break;
    case "cmd-div":
      break;
    case "cmd-mul":
      break;
    case "cmd-sub":
      break;
    case "cmd-sum":
      break;
    case "cmd-eq":
      break;
    default:
      break;
  }
}
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

initCal(output);
getBtnInput(output);
