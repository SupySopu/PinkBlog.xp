create table comment(
  id int PRIMARY key,
  id_entry int,
  id_user int,
  body tinytext,
  upvotes int,
  downvotes int
);


-- Tabla user
CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passwrd VARCHAR(20) NOT NULL,
  rol ENUM('moderator', 'user', 'admin')
);

-- Tabla entries
CREATE TABLE entries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  date DATETIME,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  descripcion TEXT NOT NULL,
  comments TEXT,
  id_notifications INT(50),
  id_project INT(50)
);

-- Tabla project
CREATE TABLE project (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  descripcion TEXT
);

-- Tabla user_notifications (relación muchos a muchos entre usuarios y notificaciones)
CREATE TABLE user_notifications (
  PRIMARY KEY(user_id, notification_id),
  user_id INT,
  notification_id INT
);

-- Tabla notification
CREATE TABLE notification (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(50),
  mesage VARCHAR(90),
  statu ENUM('unseen', 'seen'),
  fecha DATE
);

-- Tabla tags
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL
);

-- Tabla entries_tags (relación muchos a muchos entre entries y tags)
CREATE TABLE entries_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  entries_id INT,
  tags_id INT
);

ALTER TABLE user_notifications ADD FOREIGN KEY (user_id) REFERENCES user (id);
ALTER TABLE user_notifications ADD FOREIGN KEY (notification_id) REFERENCES notification (id);

ALTER TABLE entries ADD FOREIGN KEY (id_notifications) REFERENCES notification (id);
ALTER TABLE entries ADD FOREIGN KEY (id_project) REFERENCES project (id);

ALTER TABLE entries_tags ADD FOREIGN KEY (entries_id) REFERENCES entries (id);
ALTER TABLE entries_tags ADD FOREIGN KEY (tags_id) REFERENCES tags (id);


ALTER TABLE comment ADD FOREIGN KEY (id_entry) REFERENCES entries (id);
ALTER TABLE comment ADD FOREIGN KEY (id_user) REFERENCES user (id);
