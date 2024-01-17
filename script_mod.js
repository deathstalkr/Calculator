let runningTotal = 0; //stores the results of the equations
let buffer = "0"; //displays it's value on the screen
let previousOperator; //stores the last inputed operator (+,-,*,/)

const screen = document.querySelector('.screen');

function inputKeys(value) {

  if (isNaN(value))
    handleSymbol(value);
  else
    handleNumber(value);

  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        return
      }
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1)
        buffer = '0';
      else
        buffer = buffer.toString(0, buffer.length - 1)
      break;
    case '+':
    case '−':
    case '×':
    case '÷':
      handleMath(symbol);
      break;
    case '.':
      handleDecimal(symbol);
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function handleDecimal(symbol) {
  if (!buffer.includes(symbol)) {
    buffer += symbol;
  } else {
    return;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    return;
  }
  const floatBuffer = parseFloat(buffer);

  if (runningTotal === 0) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(floatBuffer) {
  if (previousOperator === '+') {
    runningTotal += floatBuffer;
  } else if (previousOperator === '−') {
    runningTotal -= floatBuffer;
  } else if (previousOperator === '×') {
    runningTotal *= floatBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= floatBuffer;
  }
}

function init() {

  document.addEventListener('keydown', function(event) {
    inputKeys(event.key)
  })
  document.querySelector('.calc-buttons').addEventListener('click', function(event) {
    inputKeys(event.target.innerText);
  })
}
init();