document.querySelector("#files").onchange = function() {
    const fileName = this.files[0]?.name;
    const label = document.querySelector("label[for=files]");
    label.innerText = fileName ?? "Browse Files";
  };

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
            image: form.get("files")
        })
    }

    const response = await fetch("http://localhost:3000/events/create", options);
    const data = await response.json();

    if (response.status == 200) {
        alert('Event submitted!')
    } else {
        alert(data.error);
    }
})