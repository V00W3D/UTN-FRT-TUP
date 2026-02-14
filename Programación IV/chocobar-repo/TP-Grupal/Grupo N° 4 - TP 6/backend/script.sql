DROP DATABASE IF EXISTS tp_grupo4;
CREATE DATABASE tp_grupo4 CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE tp_grupo4;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('admin','operador','usuario') NOT NULL DEFAULT 'usuario'
);

CREATE TABLE artistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  tipo VARCHAR(120) NOT NULL
);

CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  fecha DATE NOT NULL,
  lugar VARCHAR(150) NOT NULL,
  cupo INT NOT NULL
);

CREATE TABLE asistentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  evento_id INT NOT NULL,
  CONSTRAINT fk_asistentes_evento FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);

CREATE TABLE evento_artistas (
  evento_id INT NOT NULL,
  artista_id INT NOT NULL,
  PRIMARY KEY (evento_id, artista_id),
  CONSTRAINT fk_evento_artistas_evento FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
  CONSTRAINT fk_evento_artistas_artista FOREIGN KEY (artista_id) REFERENCES artistas(id) ON DELETE CASCADE
);
