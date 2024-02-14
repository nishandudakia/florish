document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log('nishan')

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: form.get("fname"),
            lastname: form.get("lname"),
            email: form.get("email"),
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/signup", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign('login.html')
    } else {
        alert(data.error);
    }
})