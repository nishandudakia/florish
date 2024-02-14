const logo = document.getElementById('logo');
const adminButton = document.getElementById('adminButton');
const loginButton = document.getElementById('loginButton');

function toHome() {
    location.href = './index.html';
}

function toAdmin() {
    location.href = './admin.html';
}

function toLogin() {
    location.href = './login.html';
}

logo.addEventListener('click', toHome);
adminButton.addEventListener('click', toAdmin);
loginButton.addEventListener('click', toLogin);