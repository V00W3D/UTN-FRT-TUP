USE TPN1;

CREATE TABLE alumnos(PKlegajo int not null primary key,
FKID_materias int not null,
dni int(8) not null,
nombre varchar(20) not null,
apellido varchar(20) not null);

create table materias (PKID_materias int not null primary key,
FKlegajo int not null,
nombre_mat varchar(35) not null,
turno_mat varchar(6) not null,
año_mat datetime(4) not null);

create table carreras (PKID_Carreras int not null primary key,
FKID_materias int not null,
nombre_car varchar(65) not null,
duracion_car double not null);

create table cursos (PKID_cursos int not null primary key,
FKlegajo int not null,
FKID_materias int not null);

ALTER TABLE alumnos add CONSTRAINT FK_alumnos_materias FOREIGN KEY (FKID_materias) REFERENCES materias (PKID_materias);
ALTER TABLE materias add CONSTRAINT FK_materias_alumnos FOREIGN KEY (FKlegajo) REFERENCES alumnos (PKlegajo);
ALTER TABLE carreras add CONSTRAINT FK_carreras_materias FOREIGN KEY (FKID_materias) REFERENCES materias (PKID_materias);
ALTER TABLE cursos add CONSTRAINT FK_cursos_alumnos FOREIGN KEY (FKlegajo) REFERENCES alumnos (PKlegajo);
ALTER TABLE cursos add CONSTRAINT FK_cursos_materias FOREIGN KEY (FKID_materias) REFERENCES materias (PKID_materias);

SELECT*FROM alumnos;
SELECT*FROM materias;
SELECT*FROM carreras;
SELECT*FROM cursos;