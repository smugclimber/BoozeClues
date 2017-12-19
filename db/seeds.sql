SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM teams;
SELECT * FROM scores;
SELECT * FROM teamusers;

INSERT INTO users (name, username, email, password, access, createdAt, updatedAt)
VALUES ("Nick", "Nick", "smugclimber@gmail.com", "password", false, '1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("Omar", "Omar", "omar@aol.com", "password", false, '1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("Bar Louie", "Bar Louie", "bar@barlouie.com", "barpassword", true, '1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("Crafthouse", "Crafthouse", "bar@crafthouse.com", "craftpassword", true, '1000-01-01 00:00:00', '1000-01-01 00:00:00');

INSERT INTO games (name, active, createdAt, updatedAt)
VALUES ("Taco Tuesday Trivia", false, '1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("Saturday Trivia", false, '1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("History Monday", false,'1000-01-01 00:00:00', '1000-01-01 00:00:00'), ("Throwback Thursday", false, '1000-01-01 00:00:00', '1000-01-01 00:00:00');

INSERT INTO teams (name, createdAt, updatedAt, GameId)
VALUES ("Buttheads", '1000-01-01 00:00:00', '1000-01-01 00:00:00', 1), ("Putin on the Ritz", '1000-01-01 00:00:00', '1000-01-01 00:00:00', 1), ("Jersey Jerks", '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2), ("Alabama Jerks", '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2), ("Buttheads", '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2);

INSERT INTO scores (num_corr, total_ques, scor_val, game_vic, createdAt, updatedAt, TeamId)
VALUES (4, 10, 40, false, '1000-01-01 00:00:00', '1000-01-01 00:00:00', 1), (7, 10, 70, false, '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2), (10, 10, 100, false, '1000-01-01 00:00:00', '1000-01-01 00:00:00', 4), (2, 10, 20, false, '1000-01-01 00:00:00', '1000-01-01 00:00:00', 5);

INSERT INTO teamusers (createdAt, updatedAt, UserID, TeamId)
VALUES ('1000-01-01 00:00:00', '1000-01-01 00:00:00', 1, 3), ('1000-01-01 00:00:00', '1000-01-01 00:00:00', 2, 2), ('1000-01-01 00:00:00', '1000-01-01 00:00:00', 3, 4), ('1000-01-01 00:00:00', '1000-01-01 00:00:00', 2, 3);
