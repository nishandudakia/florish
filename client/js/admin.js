let spaceFromTop = 200;

const createEventButton = document.getElementById('createbutton');
const container = document.getElementById("cardContainer");

async function acceptEvent(event) {
    const options = {
        method: "POST"
    };

    const response = await fetch(`http://localhost:3000/events/${event.currentTarget.event_id}/accept`, options);

    loadEvents();
}

async function denyEvent(event) {
    const options = {
        method: "DELETE"
    };

    const response = await fetch(`http://localhost:3000/events/${event.currentTarget.event_name}`, options);

    loadEvents();
}

function createEventElement(data) {
    const event = document.createElement("div");
    event.className = "card";
    event.style.top = spaceFromTop.toString() + 'px';
    spaceFromTop = spaceFromTop + 120;

    const imgContainer = document.createElement("div");
    imgContainer.className = "cardimgcontainer";
    event.appendChild(imgContainer);

    const img = document.createElement("img");
    img.className = "cardimg";
    img.src = data.image;
    imgContainer.appendChild(img);

    const dateContainer = document.createElement("div");
    dateContainer.className = "datecontainer";
    event.appendChild(dateContainer);

    const date = document.createElement("p");
    date.className = "date";
    const dateArray = data.date.split("T");
    date.innerHTML = `${dateArray[1]}&ensp;&ensp;&ensp; ${dateArray[0]}`;
    dateContainer.appendChild(date);

    const nameContainer = document.createElement("div");
    nameContainer.className = "namecontainer";
    event.appendChild(nameContainer);

    const name = document.createElement("p");
    name.className = "name";
    name.innerHTML = data.event_name;
    nameContainer.appendChild(name);

    const locationContainer = document.createElement("div");
    locationContainer.className = "locationcontainer";
    nameContainer.appendChild(locationContainer);

    const location = document.createElement("p");
    location.className = "location";
    location.innerHTML = data.location;
    locationContainer.appendChild(location);

    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "descriptioncontainer";
    event.appendChild(descriptionContainer);

    const description = document.createElement("p");
    description.className = "description";
    description.innerHTML = data.description;
    descriptionContainer.appendChild(description);

    const acceptButton = document.createElement("button");
    acceptButton.className = "acceptbutton";
    acceptButton.addEventListener('click', acceptEvent);
    acceptButton.event_id = data.event_id;
    event.appendChild(acceptButton);

    const tick = document.createElement("img");
    tick.className = "tick";
    tick.src = "./assets/Vector.png";
    acceptButton.appendChild(tick);

    const denyButton = document.createElement("button");
    denyButton.className = "denybutton";
    denyButton.addEventListener('click', denyEvent);
    denyButton.event_name = data.event_name;
    event.appendChild(denyButton);

    const cross = document.createElement("img");
    cross.className = "cross";
    cross.src = "./assets/cross.png";
    denyButton.appendChild(cross);

    return event;
}

async function loadEvents() {
    spaceFromTop = 200;
    container.innerHTML = '';

    const response = await fetch ("https://florish-6gcq.onrender.com/events/not");

    if (response.status == 200) {
        const events = await response.json();

        events.forEach(e => {
            const elem = createEventElement(e);
            container.appendChild(elem);
        });
    } else {
        window.location.assign("./index.html");
    }
}

function toCreator() {
    location.href = "./create.html";
}

createEventButton.addEventListener('click', toCreator);

async function setup() {
    await loadEvents();
    await setupNav();
}

setup();