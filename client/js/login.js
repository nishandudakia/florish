document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("https://florish-6gcq.onrender.com/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        //localStorage
        // data -> {authenticated: true, token:token}
        localStorage.setItem("token", data.token);
        window.location.assign('index.html')
    } else {
        alert(data.error);
    }
})