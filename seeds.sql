INSERT INTO users (email, pass, access, createdAt, updatedAt)
VALUES ("smugclimber@gmail.com", "mypassword", false, '2018-11-11', '2018-11-11'), ("omar@aol.com", "hispassword", false, '2018-11-11', '2018-11-11'), ("bar@barlouie.com", "barpassword", true, '2018-11-11', '2018-11-11'), ("bar@crafthouse.com", "craftpassword", true, '11-11-2018', '11-11-2018');

INSERT INTO games (name, active)
VALUES ("Taco Tuesday Trivia", false), ("Saturday Trivia", false), ("History Monday", false), ("Throwback Thursday", false);

INSERT INTO teams (name)
VALUES ("Buttheads"), ("Putin on the Ritz"), ("Jersey Jerks"); ("Alabama Jerks"), ("Buttheads");

INSERT INTO scores (num_corr, total_ques, scor_val, game_vic)
VALUES (4, 10, 40, false), (7, 10, 70, false), (10, 10, 100, false), (2, 10, 20, false);

SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM teams;
SELECT * FROM scores;
