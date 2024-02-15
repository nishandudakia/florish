document.getElementById("create-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_name: form.get("title"),
            location: form.get("location"),
            description: form.get("description"),
            date: form.get("date"),
            image: form.get("image")
        })
    }

    const response = await fetch("https://florish-6gcq.onrender.com/events/create", options);
    const data = await response.json();

    if (response.status == 201) {
        alert('Event submitted!')
        e.target.reset()
    } else {
        alert(data.error);
    }
})