let expression = "";

const DISPLAY = document.getElementById("user-input");
const RESULT = document.getElementById("result")
const buttons = document.querySelectorAll('.keys.display')

function appendToDisplay(value){
	if (value === '.' && /\.\d*$/.test(expression)) {
		return;
	  } else if (isOperator(value)) {
		expression = expression.replace(/[-+*/%]$/, '')
	  }

	expression += value;
	updateDisplay(expression); 
}

function isOperator(value){
	return value === '+' || value === '-' || value === '*' || value === '/' || value === '%';
}

function updateResult(){
	RESULT.value = expression;
}

function clearAllDisplay(){
	expression = "";
	console.log("expression:", expression)
	updateResult();
	updateDisplay("0");
	enableButtons();
}

function deleteDisplay(){
	expression = expression.slice(0, -1);
	updateDisplay(expression);
	enableButtons();
}

function updateDisplay(value) {
	if (value.includes('*') || value.includes('/')) {
	  value = value.replace(/\*/g, 'x').replace(/\//g, '÷');
	}
	DISPLAY.value = value || '';
  }

function calculateResult(){
	const result = math.evaluate(expression) || '0';
	console.log("result:", result)
	expression = result.toString();
	console.log("expression:", expression)
	updateResult();
	disableButtons();
	expression = "";
}

function disableButtons() {
	buttons.forEach(button => {
		button.disabled = true;
	});
}

function enableButtons() {
	buttons.forEach(button => {
	  button.disabled = false;
	});
  }