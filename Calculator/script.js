const output = document.getElementById("output");
const buttons = document.querySelectorAll(".calculator button");

const operator = ["+", "-", "*", "/"];
let currentOperator = null;
let evaluation = null;;



buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        if(value === "C"){
            evaluation = null;
            currentOperator = null;
            output.textContent = "";
        }
        else if(value === "="){
            output.textContent = evaluation;
        }
        else if(operator.includes(value)){
            
            currentOperator = value;
            output.textContent = value;
        }
        else{
            if(currentOperator === null){
                evaluation = value;
                output.textContent = value;
            }
            else{
                evaluation = eval(`${evaluation} ${currentOperator} ${value}`);
                output.textContent = value;
            }
        }
    })
})
