DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS token;
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
   ('Puppy Spa', 1, '2024-05-21T8:00', 12, 'Treat your furry friends to a day of relaxation with luxurious baths, gentle massages, and expert grooming. Our salon transforms into a haven for pets to unwind and rejuvenate. Enjoy a day filled with tail wags and cuddles as we celebrate the joy of canine companionship!', 'Bark n Bubbles', False, 'Mason, Scarlet, and more', 'https://media.glide.mailplus.co.uk/prod/images/gm_preview/6394a920f453-dog-spa-2.jpg'),
   ('Boxercise', 2, '2024-04-11T9:00', 7, 'Hook, jab and cross your way to a healthier you! Led by experienced instructors, this class offers a high-energy workout that combines boxing techniques with cardio drills. Whether you''re a beginner or a seasoned boxer, you''ll feel the burn and boost your endurance in no time. Lace up your gloves and join us for a heart-pumping Boxercise session!', 'King of the Ring Boxing Gym', True, 'Jason, Ruby, and more', 'https://anthonyjoshua.com/cdn/shop/articles/AJ_Fight_Insta_1.png?v=1662478898'),
   ('Grandma Knit Club', 1, '2024-03-15T12:00', 18, 'Grab your needles and join us for a cosy morning of tea, stories and craft, where our team of expert Grandmas will teach you the basics of knitting. You never know, you might end up with a new favourite hobby!', 'Florin Teahouse', True, 'Melisa, Jenna and more', 'https://i.guim.co.uk/img/media/b7e4ee1a0a4de41e9c91cacbea4074c68164a0de/0_954_3024_1814/master/3024.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a101e0fe71a7ad57dd89f019c5f3ad5b'),
   ('Enchanting Tales: Story Time', 3, '2024-02-26T15:00', 12, 'Step into a world of wonder and imagination at Florin Library''s Enchanting Tales: Story Time event. Join us for an afternoon filled with captivating stories, interactive activities, and a magical atmosphere that will ignite the love for storytelling in readers of all ages', 'Florin Library', True, 'Jackie, Benjamin and more', 'https://www.visit-stneots.co.uk/wp-content/uploads/2022/03/Storytime_3.jpg'),
   ('Nature''s Rejuvenation Stroll', 4, '2024-03-18T11:00', 5, 'Embark on a rejuvenating journey with our Nature''s Rejuvenation Stroll through the scenic beauty of Florin Central Park. This event invites you to immerse yourself in the wonders of nature while embracing sustainable practices to protect and preserve our beloved environment.', 'Florin Central Park', True, 'Edward, Marjorie and more', 'https://media.timeout.com/images/105172153/750/422/image.jpg'),
   ('Easter Egg Hunt', 3, '2024-03-29T10:30', 26, 'Get ready for an egg-citing adventure at our local Easter Egg Hunt! Join us for a morning of fun and discovery as children and families search for colorful eggs hidden throughout the park. With surprises around every corner and the Easter Bunny hopping by, it''s a joy-filled event for all ages. Get involved for a memorable Easter celebration!', 'Bumblebee Garden', False, 'Emma, Joshua and more', 'https://bunniesbythebay.com/cdn/shop/articles/Easter_Bunny.jpg?v=1614325156');


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
('Charlotte', 'Easton', 'lottie_isobel', 'c.easton@florincouncil.gov.uk','$2b$10$T3eDrfQ/EnenKGMjztS8yuXhHi.A8DYChxb1I5wnFndCB67oY0NUy', TRUE, 605622),
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



