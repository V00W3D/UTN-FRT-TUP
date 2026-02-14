CREATE DATABASE IF NOT EXISTS manejobdd_c9_grupo3_parcial1;
USE manejobdd_c9_grupo3_parcial1;

CREATE TABLE IF NOT EXISTS Proveedores (
    IDProveedores VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreProveedores TEXT NOT NULL,
    direccion TEXT,
    telefono VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ArticulosComprados (
    IDArComprados VARCHAR(5) PRIMARY KEY NOT NULL,
    Cantidad INT NOT NULL,
    precio VARCHAR(5) NOT NULL,
    FK_IDProveedores VARCHAR(5) NOT NULL,
    FOREIGN KEY (FK_IDProveedores) REFERENCES Proveedores(IDProveedores)
);

CREATE TABLE IF NOT EXISTS Clientes (
    IDClientes VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreCliente TEXT NOT NULL,
    DNI VARCHAR(8) NOT NULL,
    email TEXT,
    teléfono text
);

CREATE TABLE IF NOT EXISTS Productos (
    IDProducto VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreProducto TEXT NOT NULL,
    categoría VARCHAR(30) NOT NULL,
    precioCompra INT NOT NULL,
    precioVenta INT NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Ventas (
    IDVenta VARCHAR(5) PRIMARY KEY NOT NULL,
    fecha DATETIME NOT NULL,
    FK_IdCliente VARCHAR(5) NOT NULL,
    estado VARCHAR(10),
    pago DOUBLE NOT NULL,
    TipoDePago TEXT NOT NULL,
    FOREIGN KEY (FK_IdCliente) REFERENCES Clientes(IDClientes)
);

CREATE TABLE IF NOT EXISTS DetallesVenta (
    id_detallesventa INT AUTO_INCREMENT PRIMARY KEY,
    FK_IDVenta VARCHAR(5),
    FK_IDProducto VARCHAR(5),
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    FOREIGN KEY (FK_IDVenta) REFERENCES Ventas(IDVenta) ON DELETE cascade,
    FOREIGN KEY (FK_IDProducto) REFERENCES Productos(IDProducto)
);
