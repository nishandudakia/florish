const attend = document.querySelectorAll('.attendingbutton');
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

attend.forEach((button) => button.addEventListener('click', attending));
createEventButton.addEventListener('click', toCreator);