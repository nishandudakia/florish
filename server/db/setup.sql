DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS token;

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
   ('puppy spa', 1, '2024-05-21T8:00', 12, 'A place to pamper your pooches in return for all the love they give', 'Florin grooming salon', True, 'Mason, Scarlet, and more', 'url'),
   ('boxing', 2, '2024-04-11T9:00', 7, 'Learn to box', 'Florin Gym', True, 'Jason, Ruby, and more', 'url'),
   ('Grannys knitting class', 1, '2024-03-15T12:00', 18, 'Start a new hobby by taking up knitting', 'Florin community hall', True, 'Melisa, Jenna and more', 'url');


CREATE TABLE users (
user_id INT GENERATED ALWAYS AS IDENTITY,
fname VARCHAR(255) NOT NULL,
lname VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
is_council BOOLEAN DEFAULT FALSE,
council_id INT DEFAULT NULL,
PRIMARY KEY(user_id)
);
INSERT INTO users (fname, lname, username, email, password, is_council, council_id) VALUES
('Charlotte', 'Easton', 'lottie_isobel', 'c.easton@florincouncil.gov.uk',12345, TRUE, 605622),
('Jessica', 'Betiku', 'jessica', 'j.betiku@florincouncil.gov.uk',12345, TRUE, 620493),
('Nishan', 'Dudakia', 'nishandudakia', 'nishan@gmail.com',12345, FALSE, NULL),
('Cem', 'Altinay', 'genuisJ01', 'cem@gmail.com',12345, FALSE, NULL);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);



