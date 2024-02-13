DROP TABLE IF EXISTS users;

CREATE TABLE users (
user_id INT GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255),
user_name VARCHAR(255),
email_address VARCHAR(255),
is_council BOOLEAN DEFAULT FALSE,
council_id INT DEFAULT NULL,
PRIMARY KEY(user_id)
);

INSERT INTO users (first_name, last_name, user_name, email_address, is_council, council_id) VALUES
('Charlotte', 'Easton', 'lottie_isobel', 'c.easton@florincouncil.gov.uk', TRUE, 605622),
('Jessica', 'Betiku', 'jessica', 'j.betiku@florincouncil.gov.uk', TRUE, 620493),
('Nishan', 'Dudakia', 'nishandudakia', 'nishan@gmail.com', FALSE, NULL),
('Cem', 'Altinay', 'genuisJ01', 'cem@gmail.com', FALSE, NULL );