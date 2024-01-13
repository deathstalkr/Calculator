let expression = "";

const DISPLAY = document.getElementById("user-input");
const RESULT = document.getElementById("result");
const buttons = document.querySelectorAll(".keys.display");

function appendToDisplay(value) {
	// Check for existing decimal in the current number
	if (value === "." && /\.\d*$/.test(expression)) {
		return;
	} else if (isOperator(value)) {
		// Remove previous operators
		expression = expression.replace(/[-+*/%]$/, "");
	}

	expression += value;
	updateDisplay(expression);
}

function isOperator(value) {
	return (
		value === "+" ||
		value === "-" ||
		value === "*" ||
		value === "/" ||
		value === "%"
	);
}

function updateResult() {
	RESULT.value = expression;
}

function clearAllDisplay() {
	expression = "";
	console.log("expression:", expression);
	updateResult();
	updateDisplay("0");
	enableButtons();
}

function deleteDisplay() {
	expression = expression.slice(0, -1);
	updateDisplay(expression);
	enableButtons();
}

function updateDisplay(value) {
	if (value.includes("*") || value.includes("/")) {
		value = value.replace(/\*/g, "x").replace(/\//g, "÷");
	}
	DISPLAY.value = value || "";
}

// function calculateResult(){
// 	const result = math.evaluate(expression) || '0';
// 	console.log("result:", result)
// 	expression = result.toString();
// 	console.log("expression:", expression)
// 	updateResult();
// 	disableButtons();
// 	expression = "";
// }

function calculateResult() {
	try {
		const result = math.evaluate(expression);
		if (Number.isInteger(result)) {
			expression = result.toString(); // display whole numbers without trailing zeros
		} else {
			const resultString = result.toString();
			const decimalIndex = resultString.indexOf(".");
			// Round up long decimal values to 5 decimal places.
			if (
				decimalIndex !== -1 &&
				resultString.length - decimalIndex > 6
			) {
				expression =
					Math.round(result * 100000) / 100000;
			} else if (resultString === "Infinity") {
				alert("Cannot divide by Zero");
				expression = "";
				updateDisplay(expression);
			} else {
				expression = resultString;
			}
		}
		console.log("expression:", expression);
		updateResult();
		disableButtons();
		expression = "";
	} catch (error) {
		expression = "";
		updateDisplay(expression);
		alert("Invalid expression");
	} finally {
		enableButtons();
	}
}

function disableButtons() {
	buttons.forEach((button) => {
		button.disabled = true;
	});
}

function enableButtons() {
	buttons.forEach((button) => {
		button.disabled = false;
	});
}
