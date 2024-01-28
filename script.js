const list = document.querySelectorAll('.list');
function activeLink () {
    list.forEach((item) => 
    item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
item.addEventListener("click", activeLink));

// Login Page js Script
const container = document.getElementById('login-page');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', ()=>{
    console.log('active');
    container.classList.add("active");
});
loginBtn.addEventListener('click', ()=>{
    console.log("clicked");
    container.classList.remove("active");
});