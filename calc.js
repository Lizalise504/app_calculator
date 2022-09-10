const input = document.querySelector('#input');
const form = document.querySelector('#form');
const numberEl = document.querySelectorAll('button[data-type=number]');
const operatorBtn = document.querySelectorAll('button[data-type=operator]');
const deleteBtn = document.querySelector('button[data-type=erase]');
//function to prevent the form from submitting
form.addEventListener('submit', (e) =>{
    e.preventDefault();
});

//function for numbers and comma
let operatorEl = false;
numberEl.forEach((button)=>{
    button.addEventListener('click', (e) =>{
        if (input.value == '0'){
            input.value = e.target.value;
        } else if (input.value.includes('.')){
            input.value = input.value + '' + e.target.value.replace('.', '');
        } else if (operatorEl){
            operatorEl = false;
            input.value = e.target.value;
        } else {
            input.value = input.value + '' + e.target.value;
        }
    });
});

//function for operators
let result = [];
operatorBtn.forEach((button) =>{
    button.addEventListener('click', (e) =>{
        switch (e.target.value) {
            case '%':
                input.value = parseFloat(input.value) /100;
                break;
            case '=':
                result.push(input.value);
                input.value = eval(result.join(''));
                result = [];
                break;
        
            default:
                let lastArray = result[result.length - 1];
                if (['/', '*', '-', '+'].includes(lastArray) && operatorEl) {
                    result.pop();
                    result.push(e.target.value);
                } else {
                    result.push(input.value);
                    result.push(e.target.value);
                }
                operatorEl = true;
                break;
        }
    });
});