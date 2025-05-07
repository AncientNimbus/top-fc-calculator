const numeric = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const output = document.querySelector("#output");
const buffers = {
  num1: 0,
  num2: 0,
  op: null,
};
let lastAction = buffers;
const ops = {
  sum: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => (y !== 0 ? x / y : "Undefined"),
  negate: (x) => (x !== 0 ? x * -1 : 0),
  percent: (x) => (x * 0.01).toFixed(10),
};
let isNum1Saved = false;
let isResultShown = false;

// Init calculator
function initCal() {
  allClear();
  insertNumber(0);

  console.log("Calculator initialized");
}

// Get value from inputs
function getBtnInput() {
  const cal = document.querySelector("#calculator");
  cal.addEventListener("click", (e) => {
    let target = e.target;
    const button = target.closest(".cal-btn");
    if (button) {
      const value = button.querySelector(".btn-txt").textContent;
      if (button.matches(".ops")) {
        // Trigger operation
        runOps(button.id.replace("cmd-", ""), value);
      } else {
        insertNumber(value);
      }
    }
  });
}

function updateDisplay(isEval = false, data = buffers) {
  const display = document.querySelector("#output");
  const processValue = (isEval, memory) => {
    let value = !isNum1Saved ? memory.num1 : memory.num2;

    if (isEval) {
      value = memory.num1;
      isResultShown = true; // Set the flag when displaying a result
    } else {
      value = !isNum1Saved ? memory.num1 : memory.num2;
    }

    if (value == "-") {
      return value;
    }

    if (value.length < 15 || value == 0) {
      return Number(value);
    } else {
      // BUG: e-notation handling not working properly
      return Number(value);
    }
  };

  display.textContent = processValue(isEval, data);
  debug();
}

/**
 * @param {string} num
 */
function insertNumber(num = "12345.678") {
  if (isResultShown && num in numeric) {
    allClear();
    isResultShown = false;
  } else if (isResultShown && num === "-") {
    // Special case for entering a negative number right after a calculation
    buffers.num1 = lastAction.num1;
    buffers.num1 = ops.negate(Number(buffers.num1));
    updateDisplay();
    return;
  } else if (isResultShown && num === ".") {
    // Special case for entering a decimal right after a calculation
    allClear();
    isResultShown = false;
    num = "0.";
  }
  const processInput = (valueInBuffer) => {
    let current = 0;
    current = valueInBuffer;
    const hasDot = String(current).includes(".");

    console.log(`valueInBuffer: ${valueInBuffer}`);

    if (valueInBuffer == "0" && num == "-") {
      current = "-";
      saveNumToBuffer(current);
      return;
    }

    if (valueInBuffer == "0" && num != 0) {
      if (num in numeric) {
        current = num;
      } else {
        current = "0.";
      }
    } else if (valueInBuffer != "0") {
      if ((num === "." && !hasDot) || num in numeric) {
        current += num;
      }
    }
    saveNumToBuffer(current);
  };
  !isNum1Saved ? processInput(buffers.num1) : processInput(buffers.num2);
  updateDisplay();
}

function saveNumToBuffer(value) {
  if (buffers.op === null) {
    buffers.num1 = value;
  } else {
    buffers.num2 = value;
  }
}

function runOps(opsName, value) {
  switch (opsName) {
    case "ac":
      allClear(output);
      break;
    case "negate":
      // DONE: Grab on screen value instead of always second buffer
      if (isResultShown) {
        buffers.num1 = lastAction.num1;
        buffers.num1 = ops.negate(Number(buffers.num1));
      } else {
        !isNum1Saved
          ? (buffers.num1 = ops.negate(Number(buffers.num1)))
          : (buffers.num2 = ops.negate(Number(buffers.num2)));
      }
      updateDisplay();
      break;
    case "percent":
      // DONE: Grab on screen value instead of always second buffer
      if (isResultShown) {
        // If displaying a result, apply percent to that result
        buffers.num1 = lastAction.num1;
        buffers.num1 = ops.percent(Number(buffers.num1));
      } else {
        !isNum1Saved
          ? (buffers.num1 = ops.percent(Number(buffers.num1)))
          : (buffers.num2 = ops.percent(Number(buffers.num2)));
      }
      updateDisplay();
      break;
    case "eq":
      if (isNum1Saved && buffers.op !== null) {
        calculate();
        lastAction = { ...buffers };
        buffers.num1 = 0;
        buffers.num2 = 0;
        buffers.op = null;
      } else if (isNum1Saved && buffers.op === null) {
        // Repeat last
        console.log("repeat last");
        calculate(true);
      }
      break;
    case "sub":
      // Handle minus sign for both num1 and num2
      if (buffers.num1 == 0 && !isNum1Saved) {
        insertNumber("-");
      } else if (isNum1Saved && buffers.num2 == 0) {
        insertNumber("-");
      } else {
        // Normal Sub operation
        if (isResultShown) {
          buffers.num1 = lastAction.num1;
          isResultShown = false;
        }

        if (buffers.op !== null && buffers.num2 != 0 && buffers.num2 != "-") {
          calculate();
        }
        buffers.op = "sub";
        isNum1Saved = buffers.num1 !== "-" ? true : false;
      }
      break;
    default:
      if (isResultShown) {
        buffers.num1 = lastAction.num1;
        isResultShown = false;
      }

      if (buffers.op !== null && buffers.num2 != 0 && buffers.num2 != "-") {
        console.log("a");
        calculate();
        buffers.op = opsName;
      } else {
        console.log("b");
        if (buffers.num1 !== "-") buffers.op = opsName;
        isNum1Saved = buffers.num1 !== "-" ? true : false;
        console.log(isNum1Saved);
      }
      clear();
      console.log(buffers);
      break;
  }
  debug();
}

function allClear() {
  buffers.num1 = 0;
  buffers.num2 = 0;
  buffers.op = null;
  isNum1Saved = false;
  isResultShown = false;
  updateDisplay();

  console.log("All value cleared!");
}

function calculate(repeatLast) {
  if (!repeatLast) {
    buffers.num1 = ops[buffers.op](Number(buffers.num1), Number(buffers.num2));
    updateDisplay(true, buffers);
  } else {
    console.log(lastAction);
    lastAction.num1 = ops[lastAction.op](
      Number(lastAction.num1),
      Number(lastAction.num2)
    );
    buffers.num1 = lastAction.num1;
    updateDisplay(true, lastAction);
  }
}

// Clear ops
function clear() {
  buffers.num2 = 0;
}

// DONE: Behavior 1: Right after clicking equal, the next numeric input is saved to buffer 1
// DONE: Behavior 2: When both buffers are filled, the next operator input will trigger the calculation using and saved the new operator
// DONE: Behavior 3: Right after clicking equal, clicking the next operator input will save result to buffer 1
// DONE: Behavior 4: When both buffers are filled, clicking equal repeatedly will trigger the same calculation
// DONE: Behavior 5: When only buffer 1 is filled, clicking operator will simply swap the operation sign.
// DONE: Behavior 6: Support using minus button as negative
// TODO: Swap AC to C when first non-zero input is register
// TODO: Keyboard support

function debug(isOn = true) {
  if (isOn) {
    console.log(`first: ${buffers.num1}`);
    console.log(`ops: ${buffers.op}`);
    console.log(`second: ${buffers.num2}`);
  }
}

initCal();
getBtnInput();
