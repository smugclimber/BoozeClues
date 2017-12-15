INSERT INTO users (email, pass, game_id, corr_ans, game_vics, access)
VALUES ("smugclimber@gmail.com", "mypassword", "1", 15, 3, false), ("omar@aol.com", "hispassword", "1,2", 22, 2, false), ("bar@barlouie.com", "barpassword", "1,2,3", NULL, NULL, true), ("bar@crafthouse.com", "craftpassword", "4", NULL, NULL, true);

INSERT INTO games (name, active)
VALUES ("Taco Tuesday Trivia", false), ("Saturday Trivia", false), ("History Monday", false), ("Throwback Thursday", false);

INSERT INTO teams (name, users, game_id, score)
VALUES ("Buttheads", "1,2", 1, 1500), ("Putin on the Ritz", "1,3", 2, 400), ("Jersey Jerks", "2,3", 3, 1100); ("Alabama Jerks", "1", 3, 1000), ("Buttheads", "1,3", 4, 900);
