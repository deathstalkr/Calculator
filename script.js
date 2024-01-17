let expression = "";

const DISPLAY = document.getElementById("user-input");
const RESULT = document.getElementById("result");

function appendToDisplay(value) {
	// Check for existing decimal in the current number
	if (value === "." && /\.\d*$/.test(expression)) {
		return;
	} else if (isOperator(value)) {
		// Replace previous operators
		expression = expression.replace(/[-+*/%]$/, "");
	}

	// special case: Prevent appending a zero in front when any number is pressed
	if (expression === "0") {
		expression = value;
	} else {
		expression += value;
	}

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
	expression = "0";
	updateResult();
	updateDisplay(expression);
}

function deleteDisplay() {
	expression = expression.slice(0, -1);

	if (expression == "") {
		expression = "0";
	}

	updateDisplay(expression);
}

function updateDisplay(value) {
	//append 0 to expression if the first value is an operator i.e., +2 to be displayed as 0 + 2
	if (RESULT.value == "0" && isOperator(value.charAt(0))) {
		value = appendZero(value);
	}

	DISPLAY.value = transformOperators(value);
}

function appendZero(value) {
	return "0" + value;
}

function transformOperators(value) {
	if (value.includes("*") || value.includes("/")) {
		value = value.replace(/\*/g, "x").replace(/\//g, "÷");
	}
	return value;
}

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
				expression = (
					Math.round(result * 100000) / 100000
				).toString();
			} else if (resultString === "Infinity") {
				alert(
					"Warning: You're now under FBI's hitlist for dividing by Zero. Terminate now!"
				);
				clearAllDisplay();
			} else {
				expression = resultString;
			}
		}
		console.log("expression:", expression);
		updateResult();
	} catch (error) {
		alert("Invalid expression");
		clearAllDisplay();
	}
	//  finally {
	// 	enableButtons();
	// }
}

document.onload = clearAllDisplay();
