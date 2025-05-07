const numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const output = document.querySelector("#output");
const buffers = {
  num1: 0,
  num2: 0,
  op: null,
};
const ops = {
  sum: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => (y !== 0 ? x / y : "Undefined"),
  negate: (x) => (x !== 0 ? x * -1 : 0),
  percent: (x) => x * 0.01,
};
let isNum1Saved = false;

// Init calculator
function initCal(display) {
  //   console.log("Welcome!");

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

      if (button.matches(".ops")) {
        // Trigger operation
        // console.log(button.id.replace("cmd-", ""));
        runOps(button.id.replace("cmd-", ""), value);
      } else {
        // Insert Number
        insertNumber(display, value);
      }
    }
  });
}

// TODO: Update display
function updateDisplay(display) {
  display.textContent = !isNum1Saved ? buffers.num1 : buffers.num2;
}
// Insert number
/**
 * @param {HTMLDivElement} display
 * @param {string} num
 */
function insertNumber(display, num = "12345.678") {
  const processInput = (valueInBuffer) => {
    let current = 0;
    current = valueInBuffer;
    const hasDot = String(current).includes(".");

    if (valueInBuffer == "0" && num != 0) {
      current = num in numeric ? num : "0.";
    } else if (valueInBuffer != "0") {
      if ((num === "." && !hasDot) || num in numeric) {
        current += num;
      }
    }
    saveNumToBuffer(current);
  };

  if (!isNum1Saved) {
    // Process num1
    processInput(buffers.num1);
  } else {
    // Process num2
    processInput(buffers.num2);
  }

  updateDisplay(display);

  console.log(`first: ${buffers.num1}`);
  console.log(`ops: ${buffers.op}`);
  console.log(`second: ${buffers.num2}`);
}

function saveNumToBuffer(value) {
  if (buffers.op === null) {
    buffers.num1 = value;
  } else {
    buffers.num2 = value;
  }
}

// TODO: Save operator value
// TODO: Save second number value
// TODO: e-notation conversion (large value)
// TODO: Single floating point support
function runOps(opsName, value) {
  switch (opsName) {
    case "ac":
      allClear(output);
      break;
    case "negate":
      isNum1Saved
        ? (buffers.num1 = ops.negate(buffers.num1))
        : (buffers.num2 = ops.negate(buffers.num2));
      console.log(buffers);
      break;
    case "percent":
      isNum1Saved
        ? (buffers.num1 = ops.percent(buffers.num1))
        : (buffers.num2 = ops.percent(buffers.num2));
      console.log(buffers);
      break;
    case "eq":
      // Push result to buffer 1, keep buffer 2
      break;
    default:
      buffers.op = opsName;
      isNum1Saved = true;
      console.log(buffers);
      break;
  }
}

function allClear(display) {
  buffers.num1 = 0;
  buffers.num2 = 0;
  buffers.op = null;
  isNum1Saved = false;
  updateDisplay(display);

  console.log("All value cleared!");
}
// TODO: Clear ops
// TODO: Keyboard support

initCal(output);
getBtnInput(output);
