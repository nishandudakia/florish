DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE events(
event_id SERIAL PRIMARY KEY,
event_name VARCHAR(255) NOT NULL,
organiser_id INT DEFAULT 0,
date VARCHAR(50),
number_of_attendees INT DEFAULT 0,
description VARCHAR(700),
location VARCHAR(255),
accepted_status BOOLEAN DEFAULT FALSE,
list_of_attendees VARCHAR(500),
image VARCHAR(600)
);

INSERT INTO events
  (event_name, organiser_id, date, number_of_attendees, description, location, accepted_status, list_of_attendees, image)
VALUES
   ('puppy spa', 1, '21-05-2024 8AM', 12, 'A place to pamper your pooches in return for all the love they give', 'Florin grooming salon', True, 'Mason, Scarlet, and more', 'url'),
   ('boxing', 2, '11-04-2024 9AM', 7, 'Learn to box', 'Florin Gym', True, 'Jason, Ruby, and more', 'url'),
   ('Grannys knitting class', 1, '15-03-2024 12PM', 18, 'Start a new hobby by taking up knitting', 'Florin community hall', True, 'Melisa, Jenna and more', 'url');


CREATE TABLE users (
user_id INT GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
user_name VARCHAR(255) NOT NULL,
email_address VARCHAR(255) NOT NULL,
is_council BOOLEAN DEFAULT FALSE,
council_id INT DEFAULT NULL,
PRIMARY KEY(user_id)
);
INSERT INTO users (first_name, last_name, user_name, email_address, is_council, council_id) VALUES
('Charlotte', 'Easton', 'lottie_isobel', 'c.easton@florincouncil.gov.uk', TRUE, 605622),
('Jessica', 'Betiku', 'jessica', 'j.betiku@florincouncil.gov.uk', TRUE, 620493),
('Nishan', 'Dudakia', 'nishandudakia', 'nishan@gmail.com', FALSE, NULL),
('Cem', 'Altinay', 'genuisJ01', 'cem@gmail.com', FALSE, NULL);





