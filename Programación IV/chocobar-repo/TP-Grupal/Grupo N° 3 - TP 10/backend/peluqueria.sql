-- init.sql
-- Script para crear la base de datos `peluqueria` usada por el backend
-- Contiene las tablas: clientes, servicios, turnos y datos de ejemplo

CREATE DATABASE IF NOT EXISTS peluqueria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE peluqueria;

-- Tabla: clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL,
  correo VARCHAR(200) DEFAULT NULL,
  telefono VARCHAR(50) DEFAULT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY ux_clientes_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: servicios
CREATE TABLE IF NOT EXISTS servicios (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(200) NOT NULL,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  duracion_minutos INT UNSIGNED NOT NULL DEFAULT 60,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: turnos
CREATE TABLE IF NOT EXISTS turnos (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente_id INT UNSIGNED NOT NULL,
  servicio_id INT UNSIGNED NOT NULL,
  inicio DATETIME NOT NULL,
  fin DATETIME NOT NULL,
  estado ENUM('programado','realizado','cancelado') NOT NULL DEFAULT 'programado',
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_turnos_cliente (cliente_id),
  KEY idx_turnos_servicio (servicio_id),
  KEY idx_turnos_inicio (inicio),
  CONSTRAINT fk_turnos_clientes FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  CONSTRAINT fk_turnos_servicios FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de ejemplo: clientes
INSERT INTO clientes (nombre, correo, telefono)
VALUES
  ('María Pérez', 'maria.perez@example.com', '+541112223333'),
  ('Juan Gómez', 'juan.gomez@example.com', '+541133334444'),
  ('Lucía Fernández', 'lucia.fernandez@example.com', '+541144445555');

-- Datos de ejemplo: servicios
INSERT INTO servicios (nombre, precio, duracion_minutos)
VALUES
  ('Corte de cabello', 2500.00, 45),
  ('Coloración básica', 5000.00, 90),
  ('Peinado', 1800.00, 30);

-- Datos de ejemplo: turnos
-- Agregamos algunos turnos programados y realizados
INSERT INTO turnos (cliente_id, servicio_id, inicio, fin, estado)
VALUES
  (1, 1, '2025-11-10 09:00:00', '2025-11-10 09:45:00', 'programado'),
  (2, 2, '2025-11-10 10:30:00', '2025-11-10 12:00:00', 'programado'),
  (3, 3, '2025-11-09 15:00:00', '2025-11-09 15:30:00', 'realizado');

-- Índices adicionales para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_turnos_estado_inicio ON turnos (estado, inicio);

-- Fin del script
