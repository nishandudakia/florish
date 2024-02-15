document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fname: form.get("fname"),
            lname: form.get("lname"),
            username: form.get("username"),
            email: form.get("email"),
            password: form.get("password")
        })
    }

    const response = await fetch("https://florish-6gcq.onrender.com/users/signup", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign('login.html')
    } else {
        alert(data.error);
    }
})