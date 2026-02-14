-- Crear base de datos
CREATE DATABASE IF NOT EXISTS Hospital;
USE Hospital;

-- ============================
-- TABLA Roles
-- ============================
CREATE TABLE IF NOT EXISTS Roles(
  RolID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO Roles (Nombre)
VALUES ('admin'), ('paciente'), ('profesional');

-- ============================
-- TABLA Especialidades
-- ============================
CREATE TABLE IF NOT EXISTS Especialidades(
  EspecialidadID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Especialidades (Nombre)
VALUES 
  ('Ortodoncia'),
  ('Dentista'),
  ('Otorrinolaringología'),
  ('Oftalmología'),
  ('Ginecología'),
  ('Nutrición');

-- ============================
-- TABLA Usuarios
-- ============================
CREATE TABLE IF NOT EXISTS Usuarios(
  UserID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(256) NOT NULL UNIQUE,
  Contraseña VARCHAR(255) NOT NULL,
  Teléfono VARCHAR(20) NOT NULL UNIQUE,
  Correo VARCHAR(100) NOT NULL UNIQUE,
  Imagen TEXT,
  RolID INT NOT NULL,
  FechaNacimiento DATE NULL,
  EspecialidadID INT NULL,
  Deleted BOOLEAN DEFAULT FALSE,
  Activo BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (RolID) REFERENCES Roles(RolID) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (EspecialidadID) REFERENCES Especialidades(EspecialidadID) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Usuarios base de ejemplo
INSERT INTO Usuarios (Nombre, Contraseña, Teléfono, Correo, Imagen, RolID, FechaNacimiento, EspecialidadID)
VALUES 
  ('admin', '123', '12345678910', 'admin@h.com', '', 1, NULL, NULL),
  ('paciente', '123', '10987654321', 'paciente@h.com', '', 2, '1990-05-21', NULL),
  ('profesional', '123', '78945612310', 'profesional@h.com', '', 3, NULL, 1);

-- ============================
-- TABLA Turnos
-- ============================
CREATE TABLE IF NOT EXISTS Turnos(
  TurnoID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Fecha DATETIME NOT NULL,
  EspecialidadID INT NOT NULL,
  ProfesionalID INT NOT NULL,
  PacienteID INT NOT NULL,
  Estado ENUM('pendiente', 'confirmado', 'cancelado', 'completado') DEFAULT 'pendiente',
  FOREIGN KEY (EspecialidadID) REFERENCES Especialidades(EspecialidadID) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (ProfesionalID) REFERENCES Usuarios(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (PacienteID) REFERENCES Usuarios(UserID) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT uc_turno_unico UNIQUE (ProfesionalID, Fecha)
);

DELIMITER //
CREATE TRIGGER trg_no_turno_superpuesto
BEFORE INSERT ON Turnos
FOR EACH ROW
BEGIN
  DECLARE count_conflictos INT;
  SELECT COUNT(*) INTO count_conflictos
  FROM Turnos
  WHERE ProfesionalID = NEW.ProfesionalID
    AND Fecha = NEW.Fecha
    AND Estado != 'cancelado';

  IF count_conflictos > 0 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '❌ El profesional ya tiene un turno reservado en ese horario.';
  END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_validar_profesional
BEFORE INSERT ON Turnos
FOR EACH ROW
BEGIN
  DECLARE rol_prof INT;
  DECLARE esp_prof INT;

  SELECT RolID, EspecialidadID INTO rol_prof, esp_prof
  FROM Usuarios
  WHERE UserID = NEW.ProfesionalID;

  -- Verifica que exista
  IF rol_prof IS NULL THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '❌ El profesional no existe.';
  END IF;

  -- Verifica que sea de rol "profesional"
  IF rol_prof != (SELECT RolID FROM Roles WHERE Nombre = 'profesional') THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = '❌ El usuario asignado no tiene rol de profesional.';
  END IF;

  -- Asegura coherencia entre especialidades
  IF esp_prof IS NOT NULL AND NEW.EspecialidadID != esp_prof THEN
    SET NEW.EspecialidadID = esp_prof;
  END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_validar_paciente
BEFORE INSERT ON Turnos
FOR EACH ROW
BEGIN
  DECLARE rol_pac INT;

  SELECT RolID INTO rol_pac
  FROM Usuarios
  WHERE UserID = NEW.PacienteID;

  IF rol_pac IS NULL THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El paciente no existe!.';
  END IF;

  IF rol_pac != (SELECT RolID FROM Roles WHERE Nombre = 'paciente') THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'El usuario seleccionado no tiene rol de paciente!.';
  END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_soft_delete_usuario
BEFORE DELETE ON Usuarios
FOR EACH ROW
BEGIN
  UPDATE Usuarios
  SET Deleted = TRUE
  WHERE UserID = OLD.UserID;

  SIGNAL SQLSTATE '45000'
  SET MESSAGE_TEXT = 'El usuario fue baneado!.';
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_turno_fecha_valida
BEFORE INSERT ON Turnos
FOR EACH ROW
BEGIN
  IF NEW.Fecha < NOW() THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'No se pueden registrar turnos en el pasado!.';
  END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_consultar_turnos(
  IN p_fecha DATE,
  IN p_paciente_nombre VARCHAR(256)
)
BEGIN
  SELECT 
    t.TurnoID,
    t.Fecha,
    uP.Nombre AS Profesional,
    e.Nombre AS Especialidad,
    uC.Nombre AS Paciente,
    t.Estado
  FROM Turnos t
  JOIN Usuarios uP ON uP.UserID = t.ProfesionalID
  JOIN Usuarios uC ON uC.UserID = t.PacienteID
  JOIN Especialidades e ON e.EspecialidadID = t.EspecialidadID
  WHERE (p_fecha IS NULL OR DATE(t.Fecha) = p_fecha)
    AND (p_paciente_nombre IS NULL OR uC.Nombre LIKE CONCAT('%', p_paciente_nombre, '%'))
  ORDER BY t.Fecha;
END;
//
DELIMITER ;
