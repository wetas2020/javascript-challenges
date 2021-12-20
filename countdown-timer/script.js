const BirthDate = '3 Jan ' + new Date().getFullYear();

function countdown() {
    const newBirthDate = new Date(BirthDate);
    const currentDate = new Date();

    diff = new Date(newBirthDate - currentDate);
    days = diff.getDate('dd');
    hours = diff.getHours();
    min = diff.getMinutes();
    seconds = diff.getSeconds();
    showCounter();
}

function showCounter() {
    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('mins').innerHTML = min;
    document.getElementById('seconds').innerHTML = seconds;
}

// initial call
countdown();
setInterval(countdown, 1000);
