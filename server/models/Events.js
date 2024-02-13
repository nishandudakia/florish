const db = require('../db/connect')

class Event {
    constructor({event_id, event_name, organiser_id, date, number_of_attendees, description, location, accepted_status, list_of_attendees, image}) {
        this.event_id = event_id;
        this.event_name = event_name;
        this.organiser_id = organiser_id;
        this.date = date;
        this.number_of_attendees = number_of_attendees;
        this.description = description;
        this.location = location;
        this.accepted_status = accepted_status;
        this.list_of_attendees = list_of_attendees;
        this.image = image;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM events ORDER BY event_name;")

        if(response.rows.length === 0) {
            throw new Error("No events available.")
        }

        return response.rows.map(e => new Event(e));
    };

    static async getAcceptedEvents() {
        const response = await db.query("SELECT * FROM events WHERE accepted_status = TRUE;")

        if(response.rows.length === 0) {
            throw new Error("No events available.")
        }

        return (response.rows.map(e => new Event(e)))
    }

    static async acceptAnEvent(event_id) {
        response = await db.query("SELECT * FROM events WHERE event_id = $1;", [event_id])

        if(response.rows.length === 0) {
            throw new Error("No events available.")
        }

        const accepted = await db.query('UPDATE events SET accepted_status = TRUE WHERE event_id = $1;', [event_id])
        return accepted
    }

}