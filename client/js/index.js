let left = true;
let spaceFromTop = 200;
const container = document.getElementById('cardContainer');

const createEventButton = document.getElementById('createbutton');

function unattend() {
    this.innerHTML = '<p class="attendingtext">Attend</p>';
    this.removeEventListener('click', unattend);
    this.addEventListener('click', attending);
}

function attending() {
    this.innerHTML = '<p class="attendingtext">Attending</p>';
    this.removeEventListener('click', attending);
    this.addEventListener('click', unattend);
}

function toCreator() {
    location.href = "./create.html";
}

function createEventElement(data) {
    const event = document.createElement("div");
    event.className = "card";
    event.style.top = spaceFromTop.toString() + 'px';
    if(left) {
        event.style.marginLeft = '0%';
        event.style.left = '6%';
        event.style.marginRight = '-5%';
        left = false;
    } else {
        event.style.left = '17%';
        spaceFromTop = spaceFromTop - 80;
        left = true;
    }

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

    const attendingButton = document.createElement("button");
    attendingButton.className = "attendingbutton";
    attendingButton.addEventListener('click', attending);
    event.appendChild(attendingButton);

    const attendingText = document.createElement("p");
    attendingText.className = "attendingtext";
    attendingText.innerHTML = 'Attend';
    attendingButton.appendChild(attendingText);

    return event;
}

async function loadEvents() {
    spaceFromTop = 200;
    left = true;
    container.innerHTML = '';

    const response = await fetch ("http://localhost:3000/events/");

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

createEventButton.addEventListener('click', toCreator);

loadEvents();