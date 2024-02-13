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

    static async declineAnEvent(event_id) {
        response = await db.query("SELECT * FROM events WHERE event_id = $1;", [event_id])

        if(response.rows.length === 0) {
            throw new Error("No events available.")
        }

        const declined = await db.query('UPDATE events SET accepted_status = FALSE WHERE event_id = $1;', [event_id])
        return declined
    }

    static async create(data) {
        const { event_name, organiser_id, date, number_of_attendees, description, location, accepted_status, list_of_attendees, image } = data
        const existingEvent = await db.query("SELECT event_name FROM events WHERE LOWER(event_name) = LOWER($1);", [event_name])

        if(existingEvent.rows.length === 0) {
            const response = db.query("INSERT INTO events WHERE (event_name, organiser_id, date, number_of_attendees, description, location, accepted_status, list_of_attendees, image) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;", [event_name, organiser_id, date, number_of_attendees, description, location, accepted_status, list_of_attendees, image])
            return new Event(response.rows[0])
        } else {
            throw new Error("An Event with that name already exists")
          }
    }

    async destroy() {
        const response = await db.query("DELETE FROM events WHERE event_id = $1;", [event_id])

        if (response.rows.length != 1) {
            throw new Error("Unable to delete event.")
          }
      
          return response
    }

}