import textos
import mysql.connector
import sys
import os
import json
from datetime import datetime

# === INICIO DE CAMBIO PARA JSONS PORTABLES ===
# Soporte para rutas relativas (para que funcione en cualquier carpeta)
base_path = os.path.dirname(sys.executable if getattr(sys, 'frozen', False) else os.path.abspath(__file__))
boleta_temporal_path = os.path.join(base_path, "boleta_temporal.json")
boletas_path = os.path.join(base_path, "boletas.json")
# === FIN DE CAMBIO PARA JSONS PORTABLES ===

def reiniciar_programa():
    os.execl(sys.executable, sys.executable, *sys.argv)

def limpiar_pantalla():
    os.system('cls' if os.name == 'nt' else 'clear')

def iniciar_base_y_conectar(nombre_db):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password=""
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {nombre_db}")
        conn.commit()
        cursor.close()
        conn.close()

        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database=nombre_db
        )
        cursor = conn.cursor()
        crear_tablas(cursor)

        return conn, cursor

    except mysql.connector.Error as e:
        print("Error durante la conexión o creación de base:")
        print(e)
        input("Presione Enter para salir...")
        sys.exit()

def cargar_json(nombre_archivo):
    if not os.path.exists(nombre_archivo):
        return []
    with open(nombre_archivo, 'r', encoding='utf-8') as archivo:
        try:
            return json.load(archivo)
        except json.JSONDecodeError:
            return []

def guardar_json(nombre_archivo, datos):
    with open(nombre_archivo, 'w', encoding='utf-8') as archivo:
        json.dump(datos, archivo, indent=4, ensure_ascii=False)

def Inicio():
    rol=""
    limpiar_pantalla()
    textos.MenuInicio()
    opción = input("elija una opción: ")
    if opción == "1":
        rol = "cajero"
    elif opción == "2":
        rol = "receptor de mercadería"
    else: sys.exit()
    
    return rol

def MenuCajero(rol):
    limpiar_pantalla()
    textos.MenuCajerotxt(rol)
    opcion = input("Ingrese una opcion: ")
    if opcion == "1":
        MenuBoleta(jsonboletatemp)
    elif opcion == "2":
        reiniciar_programa()
    elif opcion == "3":
        sys.exit()

def MenuBoleta(jsonboletatemp):
    while True:
        limpiar_pantalla()
        productos = cargar_json(jsonboletatemp)
        total = sum(p['cantidad'] * p['P_Unitario'] for p in productos)
        # Mostrar productos cargados
        textos.BoletaVisualymenu(productos, total)
        opcion = input("Ingrese una opción: ")

        if opcion == "1":
            AgregarProductoaboleta()
        elif opcion == "2":
            EliminarProductodeboleta()
        elif opcion == "3":
            ConfirmarYGuardarBoleta()
        elif opcion == "4":
            MostrarBoletasCliente()    
        elif opcion == "5":
            break
        else:
            print("Opción inválida.")

def AgregarProductoaboleta():
    limpiar_pantalla()
    textos.MostrarTabla("Productos",cursor)
    producto_id = input("ID del producto a agregar: ")

    # Buscar en la tabla
    cursor.execute("SELECT * FROM Productos WHERE IDProducto = %s", (producto_id,))
    producto = cursor.fetchone()

    if producto:
        cantidad = int(input("Cantidad: "))
        producto_boleta = {
            "id": producto[0],
            "nombre": producto[1],
            "cantidad": cantidad,
            "P_Unitario": producto[4]
        }
        productos = cargar_json(jsonboletatemp)
        productos.append(producto_boleta)
        guardar_json(jsonboletatemp, productos)
        print("Producto agregado correctamente.")
    else:
        print("Producto no encontrado.")

def EliminarProductodeboleta():
    limpiar_pantalla()
    productos = cargar_json(jsonboletatemp)
    if not productos:
        print("No hay productos cargados.")
        return
    MostrarProductos()
    indice = int(input("Ingrese el número del producto a eliminar: ")) - 1
    if 0 <= indice < len(productos):
        eliminado = productos.pop(indice)
        guardar_json(jsonboletatemp, productos)
        print(f"Producto '{eliminado['nombre']}' eliminado.")
    else:
        print("Índice inválido.")

def generar_id_venta():
    cursor.execute("SELECT COUNT(*) FROM Ventas")
    cantidad = cursor.fetchone()[0] + 1
    return f"V{cantidad:04d}"

def seleccionar_tipo_pago():
    opciones = {
        "1": "Efectivo",
        "2": "Débito",
        "3": "Crédito",
        "4": "Transferencia",
        "5": "Cheque"
    }

    print("\nSeleccione tipo de pago:")
    for k, v in opciones.items():
        print(f"{k}. {v}")

    while True:
        opcion = input("Opción: ").strip()
        if opcion in opciones:
            return opciones[opcion]
        else:
            print("Opción inválida. Intente nuevamente.")

def ConfirmarYGuardarBoleta():
    limpiar_pantalla()
    productos = cargar_json(jsonboletatemp)
    if not productos:
        print("No hay productos cargados en la boleta.")
        return

    # Confirmar Cliente
    textos.MostrarTabla("Clientes", cursor)

    # Verificar si hay clientes en la tabla
    cursor.execute("SELECT COUNT(*) FROM Clientes")
    cantidad_clientes = cursor.fetchone()[0]

    if cantidad_clientes == 0:
        print("No hay clientes registrados.")
        opcion = input("¿Desea añadir un nuevo cliente? (s/n): ").strip().lower()
        if opcion == "s":
            añadir_cliente()
        else:
            print("Operación cancelada.")
        return

    cliente_input = input("Ingrese nombre o DNI del cliente: ")

    cursor.execute("SELECT * FROM Clientes WHERE nombreCliente LIKE %s OR DNI LIKE %s", 
                (f"%{cliente_input}%", f"%{cliente_input}%"))
    cliente = cursor.fetchone()

    if not cliente:
        print("Cliente no encontrado.")
        return

    limpiar_pantalla()
    print("\n¿Este es el cliente?")
    print(f"ID: {cliente[0]} | Nombre: {cliente[1]} | DNI: {cliente[2]}")
    confirmar_cliente = input("Confirmar (S/N): ").strip().lower()
    if confirmar_cliente != "s":
        print("Operación cancelada.")
        return
    limpiar_pantalla()
    fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    total = 0
    textos.BoletaFinalVisual(cliente, productos, fecha_actual)
    confirmar = input("¿Desea confirmar esta boleta? (S/N): ").strip().lower()

    if confirmar != "s":
        print("Boleta cancelada.")
        return
    
    limpiar_pantalla()
    tipo_pago = seleccionar_tipo_pago()

    id_venta = generar_id_venta()
    cursor.execute("INSERT INTO Ventas (IDVenta, fecha, FK_IdCliente, estado, pago, TipoDePago) VALUES (%s, %s, %s, %s, %s, %s)", 
                   (id_venta, fecha_actual, cliente[0], "Finalizada", total, tipo_pago))

    for p in productos:
        cursor.execute("INSERT INTO DetallesVenta (FK_IDVenta, FK_IDProducto, cantidad, precio_unitario) VALUES (%s, %s, %s, %s)",
                       (id_venta, p["id"], p["cantidad"], p["P_Unitario"]))
    
    conn.commit()

    #Guardar en JSON
    boletas = cargar_json(boletas_path)
    boleta_completa = {
        "id_venta": id_venta,
        "cliente": {
            "id": cliente[0],
            "nombre": cliente[1],
            "DNI": cliente[2]
        },
        "productos": productos,
        "total": total,
        "tipo_pago": tipo_pago,
        "fecha": fecha_actual
    }
    boletas.append(boleta_completa)
    guardar_json(boletas_path, boletas)
    guardar_json(jsonboletatemp, []) 

    print("Boleta guardada exitosamente.")

def generar_id_cliente():
    cursor.execute("SELECT COUNT(*) FROM Clientes")
    cantidad = cursor.fetchone()[0] + 1
    return f"C{cantidad:04d}"

def añadir_cliente():
    limpiar_pantalla()
    print("~| AÑADIR NUEVO CLIENTE |~")
    
    nombre = input("Nombre completo: ").strip()
    dni = input("DNI (sin puntos): ").strip()
    email = input("Email: ").strip()
    telefono = input("Teléfono: ").strip()
    
    id_cliente = generar_id_cliente()
    
    cursor.execute("INSERT INTO Clientes (IDClientes, nombreCliente, DNI, email, telefono_cliente) VALUES (%s, %s, %s, %s, %s)",
                   (id_cliente, nombre, dni, email, telefono))
    conn.commit()
    
    print(f"Cliente '{nombre}' añadido correctamente con ID: {id_cliente}")

def MostrarProductos(): 
    productos = cargar_json(jsonboletatemp)
    if not productos:
        print("No hay productos en la boleta.")
        return
    print("Productos en boleta actual:")
    for i, prod in enumerate(productos, 1):
        print(f"{i}. ID: {prod['id']} | Nombre: {prod['nombre']} | Cantidad: {prod['cantidad']} | Prec. Unit: {prod['P_Unitario']} ")

def MostrarBoletasCliente():
    limpiar_pantalla()
    boletas = cargar_json(boletas_path)
    if not boletas:
        print("No hay boletas registradas.")
        input("\nPresione Enter para continuar...")
        return
    textos.MostrarTabla("Clientes",cursor)
    cliente_input = input("Ingrese nombre o DNI del cliente: ").strip().lower()

    coincidencias = [
        b for b in boletas
        if cliente_input in b["cliente"]["nombre"].lower() or cliente_input in b["cliente"]["DNI"]
    ]

    if not coincidencias:
        print("No se encontraron boletas para ese cliente.")
        input("\nPresione Enter para continuar...")
        return

    print(f"\nSe encontraron {len(coincidencias)} boleta(s) para el cliente.")
    
    for b in coincidencias:
        # Mostrar usando tu visual existente
        print(f"\n========================= ~|{b["id_venta"]}|~ =========================")
        textos.BoletaFinalVisual(
            ["",b["cliente"]["nombre"], b["cliente"]["DNI"]],
            b["productos"],
            b["fecha"]
        )

    input("\nFin de listado. Presione Enter para volver al menú.")


def MenuControlprod(rol):
    while True:
        limpiar_pantalla()
        textos.MenuControlprodtxt(rol)
        opcion = input("Ingrese una opción: ")
        if opcion == "1":
            GestionarPedidos()
        elif opcion == "2":
            GestionarProducto()
        elif opcion == "3":
            GestionarProveedores()
        elif opcion == "4":
            reiniciar_programa()
        elif opcion == "5":
            sys.exit()
        else:
            print("Opción inválida.")

def GestionarPedidos():
    while True:
        limpiar_pantalla()
        print("\n~|GESTIÓN DE PEDIDOS (RECEPCIÓN)|~")
        textos.MostrarTabla("Proveedores",cursor)
        proveedor = input("ID del proveedor que entrega: ")
        textos.MostrarTabla("Productos",cursor)
        producto = input("ID del producto recibido: ")
        cantidad = int(input("Cantidad recibida: "))
        precio = input("Precio unitario del pedido: ")

        id_pedido = generar_id_pedido()

        # Insertar en ArticulosComprados
        cursor.execute("INSERT INTO ArticulosComprados VALUES (%s, %s, %s, %s)", 
            (id_pedido, cantidad, precio, proveedor))

        # Actualizar stock del producto
        cursor.execute("UPDATE Productos SET stock = stock + %s WHERE IDProducto = %s", (cantidad, producto))
        conn.commit()

        print(f"Pedido registrado y stock actualizado (+{cantidad}).")
        continuar = input("¿Registrar otro pedido? (S/N): ").strip().lower()
        if continuar != "s":
            break

def generar_id_pedido():
    cursor.execute("SELECT COUNT(*) FROM ArticulosComprados")
    cantidad = cursor.fetchone()[0] + 1
    return f"P{cantidad:04d}"

def GestionarProducto():
    while True:
        limpiar_pantalla()
        print("\n~|GESTIÓN DE PRODUCTOS|~")
        textos.MostrarTabla("Productos",cursor)
        print("1. Añadir producto")
        print("2. Editar producto")
        print("3. Eliminar producto")
        print("4. Volver")
        opcion = input("Opción: ")

        if opcion == "1":
            AñadirProducto()
        elif opcion == "2":
            EditarProducto()
        elif opcion == "3":
            EliminarProducto()
        elif opcion == "4":
            break
        else:
            print("Opción inválida.")

def AñadirProducto():
    limpiar_pantalla()
    idp = input("ID del producto: ")
    nombre = input("Nombre: ")
    categoria = input("Categoría: ")
    precioCompra = int(input("Precio de compra: "))
    precioVenta = int(input("Precio de venta: "))
    stock = int(input("Stock inicial: "))
    cursor.execute("INSERT INTO Productos VALUES (%s, %s, %s, %s, %s, %s)", 
        (idp, nombre, categoria, precioCompra, precioVenta, stock))
    conn.commit()
    print("Producto añadido.")

def EditarProducto():
    limpiar_pantalla()
    textos.MostrarTabla("Productos",cursor)
    idp = input("ID del producto a editar: ")
    campo = input("Campo a modificar (nombreProducto, categoría, precioCompra, precioVenta, stock): ")
    nuevo_valor = input(f"Nuevo valor para {campo}: ")
    cursor.execute(f"UPDATE Productos SET {campo} = %s WHERE IDProducto = %s", (nuevo_valor, idp))
    conn.commit()
    print("Producto actualizado.")

def EliminarProducto():
    limpiar_pantalla()
    textos.MostrarTabla("Productos",cursor)
    idp = input("ID del producto a eliminar: ")
    cursor.execute("DELETE FROM Productos WHERE IDProducto = %s", (idp,))
    conn.commit()
    print("Producto eliminado.")

def GestionarProveedores():
    while True:
        limpiar_pantalla()
        print("\n~|GESTIÓN DE PROVEEDORES|~")
        textos.MostrarTabla("Proveedores",cursor)
        print("1. Añadir proveedor")
        print("2. Editar proveedor")
        print("3. Eliminar proveedor")
        print("4. Volver")
        opcion = input("Opción: ")

        if opcion == "1":
            AñadirProveedor()
        elif opcion == "2":
            EditarProveedor()
        elif opcion == "3":
            EliminarProveedor()
        elif opcion == "4":
            break
        else:
            print("Opción inválida.")

def AñadirProveedor():
    idp = input("ID del proveedor: ")
    nombre = input("Nombre: ")
    direccion = input("Dirección: ")
    telefono = input("Teléfono: ")
    email = input("Email: ")
    cursor.execute("INSERT INTO Proveedores VALUES (%s, %s, %s, %s, %s)", 
                   (idp, nombre, direccion, telefono, email))
    conn.commit()
    print("Proveedor añadido.")

def EditarProveedor():
    idp = input("ID del proveedor a editar: ")
    campo = input("Campo a modificar (nombreProveedores, direccion, telefono_proveedor, email): ")
    nuevo_valor = input(f"Nuevo valor para {campo}: ")
    cursor.execute(f"UPDATE Proveedores SET {campo} = %s WHERE IDProveedores = %s", 
                   (nuevo_valor, idp))
    conn.commit()
    print("Proveedor actualizado.")

def EliminarProveedor():
    idp = input("ID del proveedor a eliminar: ")
    cursor.execute("DELETE FROM Proveedores WHERE IDProveedores = %s", (idp,))
    conn.commit()
    print("Proveedor eliminado.")

def llenarbd():
    cursor.execute("SELECT COUNT(*) FROM Proveedores")
    if cursor.fetchone()[0] == 0:
        proveedores = [
            ("1", 'Distribuidora Los Andes', 'Av. Central 1234, Buenos Aires', '011-4567-8901', 'Comestibles'),
            ("2", 'Alimentos La Cordial', 'Ruta 5 km 24, Córdoba', '0351-445-2398', 'Comestibles'),
            ("3", 'ElectroMundo S.A.', 'Calle 9 N°876, Rosario', '0341-532-1122', 'Electrodomésticos'),
            ("4", 'TecnoHouse Proveedor', 'Av. Independencia 678, Mendoza', '0261-422-6677', 'Electrodomésticos'),
            ("5", 'Frigorífico El Pampeano', 'Parque Industrial, Santa Rosa', '02954-430-987', 'Comestibles'),
            ("6", 'Dulces del Sur S.R.L.', 'Av. Mitre 2350, Neuquén', '0299-476-2233', 'Comestibles'),
            ("7", 'ElectroGlobal Import S.A.', 'Ruta Nacional 3, Bahía Blanca', '0291-488-7722', 'Electrodomésticos'),
            ("8", 'Grupo TecnoCom', 'Calle Libertad 123, Salta', '0387-421-9988', 'Electrodomésticos')
        ]
        cursor.executemany("INSERT INTO Proveedores VALUES (%s, %s, %s, %s, %s)", proveedores)

    cursor.execute("SELECT COUNT(*) FROM Productos")
    if cursor.fetchone()[0] == 0:
        productos = [
            ("1", 'Arroz Largo Fino 1kg', 'Comestible', 250, 400, 500),
            ("2", 'Azúcar Blanca 1kg', 'Comestible', 220, 350, 400),
            ("3", 'Aceite de Girasol 1L', 'Comestible', 600, 900, 300),
            ("4", 'Leche Entera 1L', 'Comestible', 290, 450, 600),
            ("5", 'Cocina Eléctrica 4 hornallas', 'Electrodoméstico', 85000, 110000, 50),
            ("6", 'Heladera con freezer 300L', 'Electrodoméstico', 180000, 220000, 40),
            ("7", 'Microondas 20L', 'Electrodoméstico', 65000, 79000, 70),
            ("8", 'Lavarropas Automático 7kg', 'Electrodoméstico', 145000, 180000, 30),
            ("9", 'Yerba Mate 1kg', 'Comestible', 750, 980, 350),
            ("10", 'Galletitas Dulces 300g', 'Comestible', 320, 450, 500),
            ("11", 'Fideos Spaghetti 500g', 'Comestible', 280, 370, 600),
            ("12", 'Conserva de Atún 170g', 'Comestible', 550, 700, 400),
            ("13", 'Harina 000 1kg', 'Comestible', 210, 290, 450),
            ("14", 'Mermelada de Durazno 500g', 'Comestible', 430, 590, 300),
            ("15", 'Televisor Smart 43”', 'Electrodoméstico', 220000, 270000, 25),
            ("16", 'Aspiradora Compacta 1800W', 'Electrodoméstico', 72000, 88000, 40),
            ("17", 'Ventilador de Pie 20”', 'Electrodoméstico', 45000, 60000, 60),
            ("18", 'Cafetera Eléctrica 1.2L', 'Electrodoméstico', 38000, 49000, 55),
            ("19", 'Tostadora 2 ranuras', 'Electrodoméstico', 26000, 35000, 50),
            ("20", 'Plancha a vapor', 'Electrodoméstico', 24000, 31000, 70)
        ]
        cursor.executemany("INSERT INTO Productos VALUES (%s, %s, %s, %s, %s, %s)", productos)

    conn.commit()
    print("Datos precargados correctamente.")

def crear_tablas(cursor):
    instrucciones = [
    """CREATE TABLE IF NOT EXISTS Proveedores (
    IDProveedores VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreProveedores TEXT NOT NULL,
    direccion TEXT,
    telefono_proveedor VARCHAR(20),
    email VARCHAR(100))
    """,
    """
    CREATE TABLE IF NOT EXISTS ArticulosComprados (
    IDArComprados VARCHAR(5) PRIMARY KEY NOT NULL,
    Cantidad INT NOT NULL,
    precio VARCHAR(5) NOT NULL,
    FK_IDProveedores VARCHAR(5) NOT NULL,
    FOREIGN KEY (FK_IDProveedores) REFERENCES Proveedores(IDProveedores))
    """,
    """
    CREATE TABLE IF NOT EXISTS Clientes (
    IDClientes VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreCliente TEXT NOT NULL,
    DNI VARCHAR(8) NOT NULL,
    email TEXT,
    telefono_cliente TEXT)
    """,
    """
    CREATE TABLE IF NOT EXISTS Productos (
    IDProducto VARCHAR(5) PRIMARY KEY NOT NULL,
    nombreProducto TEXT NOT NULL,
    categoría VARCHAR(30) NOT NULL,
    precioCompra INT NOT NULL,
    precioVenta INT NOT NULL,
    stock INT NOT NULL)
    """,
    """
    CREATE TABLE IF NOT EXISTS Ventas (
    IDVenta VARCHAR(5) PRIMARY KEY NOT NULL,
    fecha DATETIME NOT NULL,
    FK_IdCliente VARCHAR(5) NOT NULL,
    estado VARCHAR(10),
    pago DOUBLE NOT NULL,
    TipoDePago TEXT NOT NULL,
    FOREIGN KEY (FK_IdCliente) REFERENCES Clientes(IDClientes))
    """,
    """
    CREATE TABLE IF NOT EXISTS DetallesVenta (
    id_detallesventa INT AUTO_INCREMENT PRIMARY KEY,
    FK_IDVenta VARCHAR(5),
    FK_IDProducto VARCHAR(5),
    cantidad INT NOT NULL,
    precio_unitario INT NOT NULL,
    FOREIGN KEY (FK_IDVenta) REFERENCES Ventas(IDVenta) ON DELETE cascade,
    FOREIGN KEY (FK_IDProducto) REFERENCES Productos(IDProducto))
    """]
    for sql in instrucciones:
        cursor.execute(sql)

jsonboletatemp = boleta_temporal_path
try:
    conn, cursor = iniciar_base_y_conectar("ControlStock_Grupo3_C9_parcial1")
except mysql.connector.Error as e:
    print("Error al conectar con la base de datos MySQL:")
    print(e)
    input("Presione Enter para cerrar...")
    sys.exit()
llenarbd()
rol = Inicio()

if rol == "cajero":
        MenuCajero(rol)
elif rol == "receptor de mercadería":
    MenuControlprod(rol)
# Cargar datos por única vez si están vacíos



    

