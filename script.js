let firstNumber;
let operator;
let secondNumber;

const CURRENTSELECTION = document.getElementById("user-input");
const NUMBERS = document.querySelectorAll(".keys.display");
const EQUALS = document.getElementsByClassName("equals");
const CLEAR = document.getElementsByClassName("function");
const DECIMAL = document.getElementsByClassName("decimal");




function operate() {
	if (operator == "+") add(firstNumber, secondNumber);
	if (operator == "-") subtract(firstNumber, secondNumber);
	if (operator == "*") multiply(firstNumber, secondNumber);
	if (operator == "/") divide(firstNumber, secondNumber);
}

NUMBERS.forEach((element) => {
	element.addEventListener("click", function (e) {
		num = e.target.value;
		CURRENTSELECTION.textContent += `${num}`;
	});
});
