const token = localStorage.getItem("token");
const logo = document.getElementById('logo');
const adminButton = document.getElementById('adminButton');
const loginButton = document.getElementById('loginButton');
const initials = document.getElementById('initials');

async function getToken(){
    if(token == null) {
        if(adminButton != null) {
            adminButton.className = 'adminButtonHidden';
        }
        if(initials != null) {
            initials.className = 'initialsHidden';
        }
    } else if(token != null) {
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(`https://florish-6gcq.onrender.com/users/token/${token}`, options);
        const data = await response.json();

        loginButton.innerHTML = 'Logout';
        loginButton.className = 'logoutButton';
    
        const response2 = await fetch(`https://florish-6gcq.onrender.com/users/${data.user_id}`);
        const user = await response2.json();
        if(!user.is_council) {
            adminButton.className = 'adminButtonHidden';
        }
            
        initials.innerHTML = user.fname.charAt(0).toUpperCase() + user.lname.charAt(0).toUpperCase();

    }
}


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

function toHome() {
    location.href = './index.html';
}

function toAdmin() {
    location.href = './admin.html';
}

function toLogin() {
    location.href = './login.html';
}

function logout(e) {
    e.preventDefault();

    localStorage.clear();

    location.href = './login.html';
}

async function setupNav() {
    await getToken();

    logo.addEventListener('click', toHome);
    if(adminButton != null) {
        adminButton.addEventListener('click', toAdmin);
    }
    if(loginButton != null) {
        if(loginButton.className == 'loginButton'){
            loginButton.addEventListener('click', toLogin);
        } else if(loginButton.className == 'logoutButton') {
            loginButton.addEventListener('click', logout);
        }
    }
}

setupNav();