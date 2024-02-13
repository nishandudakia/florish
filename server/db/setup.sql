DROP TABLE IF EXISTS events;

CREATE TABLE events(
event_id INT SERIAL GENERATED ALWAYS AS IDENTITY,
event_name VARCHAR(255) NOT NULL,
organiser_id INT DEFAULT,
date DATE,
time TIME,
number_of_attendees INT DEFAULT 0,
description VARCHAR(700),
location VARCHAR(255),
accepted_status BOOLEAN DEFAULT FALSE,
list_of_attendees VARCHAR(500),
image VARCHAR(600)
PRIMARY KEY(event_id)
);