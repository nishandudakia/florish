document.getElementById("logoutButton").addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");

    window.location.assign('login.html')
})