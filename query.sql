CREATE DATABASE social CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_login VARCHAR(30) NOT NULL,
    user_hash VARCHAR(255) NOT NULL,
    user_role ENUM('user', 'admin'),
    user_name VARCHAR(255) DEFAULT NULL,
    user_age int(3) UNSIGNED DEFAULT NULL,
    PRIMARY KEY(id),
    UNIQUE (user_login)
);


INSERT INTO products (name, short_description, description, price, img_url, quantity, vendor, category_id, attr_type, attr_manufacturer, attr_vid, attr_sae, attr_capacity)
    VALUES ('Масло Aral H