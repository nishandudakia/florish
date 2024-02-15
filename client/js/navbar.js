const token = localStorage.getItem("token")
async function getUserId(){
    const options = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    const response = await fetch(`http://localhost:3000/users/${token}`, options);
    const data = await response.json();
    
    console.log(data)
}

getUserId()


// const options2 = {
//     method: "GET",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         event_name: form.get("title"),
//         location: form.get("location"),
//         description: form.get("description"),
//         date: form.get("date"),
//         image: form.get("image")
//     })
// }

// const response2 = await fetch("http://localhost:3000/events/create", options);
// const data2 = await response.json();

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