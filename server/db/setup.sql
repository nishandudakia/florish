DROP TABLE IF EXISTS events;

CREATE TABLE events(
event_id SERIAL PRIMARY KEY,
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
);

INSERT INTO events
  (event_name, organiser_id, date, time, number_of_attendees, description, location, accepted_status, list_of_attendees, image)
VALUES
   ('puppy spa', 1, 21/05/2024, 8:00, 12, 'A place to pamper your pooches in return for all the love they give', 'Florin grooming salon', True, 'Mason, Scarlet, and more', 'url')
   ('boxing', 2, 11/04/2024, 9:00, 7, 'Learn to box', 'Florin Gym', True, 'Jason, Ruby, and more', 'url')
   ('Grannys knitting class', 1, 15/03/2024, 12:00, 18, 'Start a new hobby by taking up knitting', 'Florin community hall', True, 'Melisa, Jenna and more', 'url')