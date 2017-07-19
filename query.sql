CREATE DATABASE social CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_login VARCHAR(30) NOT NULL,
    user_hash VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin'),
    user_name VARCHAR(255) DEFAULT NULL,
    user_age int(3) UNSIGNED DEFAULT NULL,
    user_avatar_name VARCHAR(255) DEFAULT NULL,
    is_locked ENUM('TRUE','FALSE') DEFAULT 'FALSE',
    PRIMARY KEY(id),
    UNIQUE (user_login)
);


INSERT INTO users (user_login, user_hash, user_role, user_name) VALUES ('beetroot', '14bc3c2f3e3254b8054cd8218f9344f712ffb33b92cdaa90706adbdde9c2af22', 'admin', 'beetroot');
UPDATE users SET 'user_name'= 'Habib' WHERE id=1;
