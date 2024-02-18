const list = document.querySelectorAll('.list');
function activeLink () {
    list.forEach((item) => 
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener("click", activeLink));


// Js Date and time
const currentTime = () => {
    const current_time = document.getElementById("current_time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let full_time = `${hours}:${minutes}:${seconds} `;
    current_time.innerText = full_time;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const current_date = document.getElementById("current_date");
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    console.log(month);
    let day = date.getDate();

    let cal = `${month}, ${day}  ${year} `;
    current_date.innerText = cal;
};
currentTime();
setInterval(currentTime, 1000);
setInterval(currentTime, 1000);
// set up count down js

let days = document.getElementById('days');
let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');

let dd = document.getElementById('dd')
let hh = document.getElementById('hh')
let mm = document.getElementById('mm')
let ss = document.getElementById('ss')

let endDate = '03/09/2024 01:00';

let x = setInterval(function() {
    let now = new Date(endDate).getTime();
    let countDown = new Date().getTime();
    let distance = now - countDown;

    // calculations
    let d = Math.floor(distance / (1000 * 60 * 60 * 24));
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60 )) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / (1000));

    // outpputs
    days.innerHTML = d + "<br> <span>Days</span>";
    hours.innerHTML = h + "<br> <span>Hours</span>";
    minutes.innerHTML = m + "<br> <span>Minutes</span>";
    seconds.innerHTML = s + "<br> <span>Seconds</span>";

    // animate stroke
    dd.style.strokeDashoffset = 285 - (285 * d) / 365;
    hh.style.strokeDashoffset = 285 - (285 * h) / 24;
    mm.style.strokeDashoffset = 285 - (285 * m) / 60;
    ss.style.strokeDashoffset = 285 - (285 * s) / 60;
    
})

// //add new form js
const selectBtn = document.getElementById('select-btn');
const text = document.getElementById('text');
const option = document.getElementsByClassName('option');

selectBtn.addEventListener('click',() => {
    selectBtn.classList.toggle('active');
});
for(options of option) {
    options.onclick = function() {
        text.innerHTML = this.textContent;
        selectBtn.classList.remove('active');
    }
}
// option button 2
const select_btn = document.getElementById('select_btn');
const selection = document.getElementById('option-name');
const select = document.getElementById('statusOption');

select_btn.addEventListener('click',() => {
    select_btn.classList.toggle('active');
});
for(selects of statusOption) {
    selects.onclick = function() {
        selection.innerHTML = this.textContent;
        select_btn.classList.remove('active');
    }
}

//seleting tables
$(document).ready( function () {
    $('#task-table').DataTable();
} );



















