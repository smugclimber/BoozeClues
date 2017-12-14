DROP DATABASE IF EXISTS boozeclues_db;
CREATE DATABASE boozeclues_db;

CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  pic VARCHAR(80) NULL,
  email VARCHAR(40) NOT NULL,
  pass VARCHAR(20) NOT  NULL,
  game_id VARCHAR(500) NULL,
  corr_ans INT(5) DEFAULT 0,
  game_vics INT(4) DEFAULT 0,
  access BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE games(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  active BOOLEAN DEFAULT true,
  PRIMARY KEY (id)
);

CREATE TABLE teams(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  users VARCHAR(30) NOT NULL,
  game_id INT(3) NOT NULL,
  score INT (4) DEFAULT 0,
  PRIMARY KEY (id)
);

SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM teams;

INSERT INTO users (email, pass, game_id, corr_ans, game_vics, access)
VALUES ("smugclimber@gmail.com", "mypassword", "1", 15, 3, false), ("omar@aol.com", "hispassword", "1,2", 22, 2, false), ("bar@barlouie.com", "barpassword", "1,2,3", NULL, NULL, true), ("bar@crafthouse.com", "craftpassword", "4", NULL, NULL, true);

INSERT INTO games (name, active)
VALUES ("Taco Tuesday Trivia", false), ("Saturday Trivia", false), ("History Monday", false), ("Throwback Thursday", false);

INSERT INTO teams (name, users, game_id, score)
VALUES ("Buttheads", "1,2", 1, 1500), ("Putin on the Ritz", "1,3", 2, 400), ("Jersey Jerks", "2,3", 3, 1100); ("Alabama Jerks", "1", 3, 1000), ("Buttheads", "1,3", 4, 900);
