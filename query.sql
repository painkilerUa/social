CREATE DATABASE social CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_login VARCHAR(30) NOT NULL,
    user_hash VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin'),
    user_name VARCHAR(255) DEFAULT NULL,
    user_age int(3) UNSIGNED DEFAULT NULL,
    user_avatar ENUM('TRUE','FALSE') DEFAULT 'FALSE',
    is_locked ENUM('TRUE','FALSE') DEFAULT 'FALSE',
    PRIMARY KEY(id),
    UNIQUE (user_login)
);


INSERT INTO users (user_login, user_hash, user_role, user_name) VALUES ('beetroot', '" + hash + "', 'user', '" + username +"')"