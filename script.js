
const dayInput = document.querySelector('.day-input');
const monthInput = document.querySelector('.month-input');
const yearInput = document.querySelector('.year-input');

const dayLabel = document.querySelector('.day-result');
const monthLabel = document.querySelector('.month-result');
const yearLabel = document.querySelector('.year-result');

const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');

const submit = document.querySelector('.submit');

submit.addEventListener('click', e => {

    reset();

    if(!dayInput.value) {
        dayError.innerHTML = "This field is required";
        errorBlock(dayError, dayInput);
    }

    if(!monthInput.value){
        monthError.innerHTML = "This field is required";
        errorBlock(monthError, monthInput);
    }

    if(!yearInput.value) {
        yearError.innerHTML = "This field is required";
        errorBlock(yearError, yearInput);
    }

    if(!(Number(monthInput.value) <= 12)) {
        monthError.innerHTML = "Must be a valid month";
        errorBlock(monthError, monthInput)
    }
    if(!(Number(yearInput.value))) {
        yearError.innerHTML = "Must be a valid year"
        errorBlock(yearError, yearInput)
    }

    let maxDaysDate = new Date (yearInput.value, monthInput.value, 0);
    console.log(maxDaysDate);
    let daysInMonth = maxDaysDate.getDate();
    console.log(daysInMonth);

    if(!(Number(dayInput.value) <= daysInMonth)) {
        dayError.innerHTML = "Must be a valid day"
        errorBlock(dayError, dayInput)
        return;
    }


    let currentDate = new Date();
    let dateSelected = new Date(yearInput.value , monthInput.value - 1, dayInput.value);
    console.log(dateSelected);

    if(dateSelected > currentDate) {
        yearError.innerHTML = "Must be in the past"
        errorBlock(yearError, yearInput)
        return;
    }

    let years = Math.abs(dateSelected.getFullYear() - currentDate.getFullYear());
    let month = 0;
    let day = 0;

    if(currentDate.getMonth() < dateSelected.getMonth()) {
        years-=1;
        month = (currentDate.getMonth() + 12) - dateSelected.getMonth();
    } else {
        month = currentDate.getMonth() - dateSelected.getMonth();
    }

    if(currentDate.getDate() < dateSelected.getDate()) {
        month-=1;
        day = (currentDate.getDate() + 31) - dateSelected.getDate();
    } else {
        day = currentDate.getDate() - dateSelected.getDate();
    }
    
    yearLabel.innerHTML = padNumber(years);
    monthLabel.innerHTML = padNumber(month);
    dayLabel.innerHTML = padNumber(day);


})


function errorBlock(text, block) {
    text.style.display = "block";
    block.style.borderColor = "hsl(0, 100%, 67%)";
}

function padNumber(num) {
    return num < 10 ? num.toString().padStart(2, '0') : num
}

function reset() {
    dayError.style.display = "none"
    monthError.style.display = "none"
    yearError.style.display = "none"

    dayInput.style.borderColor = "hsl(0, 0%, 94%)";
    monthInput.style.borderColor = "hsl(0, 0%, 94%)";
    yearInput.style.borderColor = "hsl(0, 0%, 94%)";
}