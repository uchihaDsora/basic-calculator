let display = document.getElementById("display");

function appendToDisplay(value) {
    if (value === "%" && display.value !== "") {
        display.value += "%";
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateSquareRoot() {
    if (display.value) {
        let number = parseFloat(display.value);
        display.value = number >= 0 ? Math.sqrt(number) : "Error";
    }
}

function calculateResult() {
    try {
        let expression = display.value
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "*0.01");

        display.value = new Function("return " + expression)();
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key.toLowerCase() === "c") {
        clearDisplay();
    }
});

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}
