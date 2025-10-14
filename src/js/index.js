require("./styles.css");

const BUTTON_TYPES = {
  OPERATOR: "operator",
  OPERAND: "operand",
  EQUAL: "equal",
  CLEAR_ALL: "clear_all",
  DECIMAL_SEPARATOR: "decimal_separator",
  PERCENT: "percent",
  TOGGLE_SIGN: "toggle_sign",
};

const OPERATION_TYPES = {
  SUM: "sum",
  DIF: "dif",
  MUL: "mul",
  DIV: "div",
};

const calculatorState = {
  displayValue: "0",
  firstOperand: null,
  operatorType: null,
  decimal_separator: null,
  result: 0,
};

function showDisplayValue(value, display) {
  display.value = String(value);
}

function makeOperation(operatorType, firstOperand, secondOperand) {
  switch (operatorType) {
    case OPERATION_TYPES.SUM:
      return firstOperand + secondOperand;
    case OPERATION_TYPES.DIF:
      return firstOperand - secondOperand;
    case OPERATION_TYPES.MUL:
      return firstOperand * secondOperand;
    case OPERATION_TYPES.DIV:
      if (secondOperand === 0) {
        throw new Error("На ноль делить нельзя");
      }
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function main() {
  const display = document.querySelector(".input");
  const ACButton = document.querySelector(".decorations");
  const themeToggle = document.getElementById("themeToggle");
  const buttons = document.querySelector(".buttons");
  if (!display || !ACButton || !buttons) return;

  buttons.addEventListener("click", function (event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const buttonType = target.getAttribute("data-button-type");
    const value = target.getAttribute("value") || "";

    if (buttonType === BUTTON_TYPES.OPERAND) {
      if (calculatorState.displayValue === "0") {
        calculatorState.displayValue = value;
      } else {
        calculatorState.displayValue += value;
      }
      showDisplayValue(calculatorState.displayValue, display);
    } else if (buttonType === BUTTON_TYPES.OPERATOR) {
      calculatorState.decimal_separator = null;
      if (calculatorState.operatorType !== null) {
        try {
          calculatorState.result = makeOperation(
            calculatorState.operatorType,
            calculatorState.firstOperand,
            Number(calculatorState.displayValue),
          );
        } catch (e) {
          showDisplayValue(e.message, display);
          return;
        }
        calculatorState.firstOperand = calculatorState.result;
      } else {
        calculatorState.firstOperand = Number(calculatorState.displayValue);
      }
      calculatorState.operatorType = value;
      calculatorState.displayValue = "0";
      showDisplayValue(
        calculatorState.result === 0 ? calculatorState.firstOperand : calculatorState.result,
        display,
      );
    } else if (buttonType === BUTTON_TYPES.EQUAL) {
      try {
        calculatorState.result = makeOperation(
          calculatorState.operatorType,
          calculatorState.firstOperand,
          Number(calculatorState.displayValue),
        );
      } catch (e) {
        showDisplayValue(e.message, display);
        return;
      }
      const rounded = Math.round(calculatorState.result * 10000) / 10000;
      calculatorState.result = rounded;
      showDisplayValue(rounded, display);
    } else if (buttonType === BUTTON_TYPES.DECIMAL_SEPARATOR) {
      if (calculatorState.decimal_separator === null) {
        calculatorState.decimal_separator = ".";
        calculatorState.displayValue += ".";
        showDisplayValue(calculatorState.displayValue, display);
      }
    } else if (buttonType === BUTTON_TYPES.PERCENT) {
      const current = Number(calculatorState.displayValue);
      const res = Math.round((current / 100) * 10000) / 10000;
      calculatorState.displayValue = String(res);
      showDisplayValue(calculatorState.displayValue, display);
    } else if (buttonType === BUTTON_TYPES.TOGGLE_SIGN) {
      if (calculatorState.displayValue.startsWith("-")) {
        calculatorState.displayValue = calculatorState.displayValue.slice(1);
      } else if (calculatorState.displayValue !== "0") {
        calculatorState.displayValue = "-" + calculatorState.displayValue;
      }
      showDisplayValue(calculatorState.displayValue, display);
    }
  });

  // AC is now inside the keyboard grid
  buttons.addEventListener("click", function (event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const type = target.getAttribute("data-button-type");
    if (type === BUTTON_TYPES.CLEAR_ALL) {
      calculatorState.displayValue = "0";
      calculatorState.firstOperand = null;
      calculatorState.operatorType = null;
      calculatorState.decimal_separator = null;
      calculatorState.result = 0;
      showDisplayValue(calculatorState.displayValue, display);
    }
  });

  window.onload = function () {
    showDisplayValue(calculatorState.displayValue, display);
  };

  // theme management
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.documentElement.setAttribute("data-theme", "light");
  themeToggle &&
    themeToggle.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const next = isLight ? "dark" : "light";
      if (next === "light") document.documentElement.setAttribute("data-theme", "light");
      else document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", next);
    });
}

main();
