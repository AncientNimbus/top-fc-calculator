// TODO: Init calculator
function initCal() {
  console.log("Welcome!");
  allClear();
  setDisplayOutput();
  console.log("Calculator initialized");
}

// TODO: Get value from inputs
function getBtnInput() {
  const cal = document.querySelector("#calculator");

  cal.addEventListener("click", (e) => {
    let target = e.target;

    const button = target.closest(".cal-btn");

    if (button) {
      const value = button.querySelector(".btn-txt").textContent;
      console.log(`Clicked ${value}`);
    }
  });
}

// TODO: Display number
/**
 * @param {string} num
 */
function setDisplayOutput(num = "12345.678") {
  const output = document.querySelector("#output");
  output.textContent = num;
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
function allClear() {
  console.log("All value cleared!");
}
// TODO: Clear ops
// TODO: Keyboard support

// main
function main() {
  let firstBuffer = 0;
  let secondBuffer = 0;
  let operator = "";

  initCal();
  getBtnInput();
  console.log(getBtnInput());
}

main();
