import mysql.connector

def MenuInicio():
    print("~|Base de datos II - Comisión 9 - TUP2024 - Aula 241 |~")
    print("Grupo 3:")
    print("~~|*|~~ Diaz Rossini Juán José")
    print("~~|*|~~ Gallo Genaro")
    print("~~|*|~~ Liacoplo Gerónimo Emiliano")
    print("~~|*|~~ Navarro Victor Leandro") 
    print("=======================================================")
    print("|Quien está por usar el sistema?|")
    print("1. Cajero")
    print("2. Receptor de mercadería")
    print("3. salir")
    print("=======================================================")

def MenuCajerotxt(rol):
    print("~|VENTA DE PRODUCTOS|~")
    print("=======================================================")
    print(f"rol: {rol}")
    print("=======================================================")
    print("1. Gestionar boleta")
    print("2. Cambiar rol")
    print("3. Salir del sistema")

def BoletaVisualymenu(productos, total):
    print("\n~|GESTIÓN DE BOLETAS|~")
    print("=" * 55)
    if productos:
        print("Productos en boleta actual:")
        print("-" * 55)
        for i, p in enumerate(productos, 1):
            subtotal = p['cantidad'] * p['P_Unitario']
            print(f"{i}. {p['nombre'][:20].ljust(20)} | x{p['cantidad']} | ${p['P_Unitario']} | Subtotal: ${subtotal}")
        print("-" * 55)
        print(f"TOTAL: ${total:.2f}")
    else:
        print("No hay productos en la boleta.")
    print("=" * 55)

    print("1. Agregar producto")
    print("2. Eliminar producto")
    print("3. Confirmar y guardar boleta")
    print("4. Mostrar boletas de un cliente en específico")
    print("5. Volver")
    print("=" * 55)

def BoletaFinalVisual(cliente, productos, fecha_actual):
    total=0
    print("\n~|BOLETA DE VENTA|~")
    print(f"Cliente: {cliente[1]} | DNI: {cliente[2]}")
    print(f"Fecha: {fecha_actual}")
    print("-" * 60)

    for i, p in enumerate(productos, 1):
        subtotal = p['cantidad'] * p['P_Unitario']
        total += subtotal
        print(f"{i}. {p['nombre'][:20].ljust(20)} | x{p['cantidad']} | ${p['P_Unitario']} | Subtotal: ${subtotal}")

    print("-" * 60)
    print(f"TOTAL: ${total}")
    print("=" * 60)

def MenuControlprodtxt(rol):
    print("\n~|CONTROL DE MERCADERÍA|~")
    print(f"Rol: {rol}")
    print("=" * 55)
    print("1. Gestionar pedidos (recepción de mercadería)")   
    print("2. Gestionar productos") 
    print("3. Gestionar proveedores") 
    print("4. Cambiar rol")
    print("5. Salir del sistema")
    print("=" * 55)

def MostrarTabla(nombre_tabla,cursor):
    try:
        cursor.execute(f"SELECT * FROM {nombre_tabla}")
        columnas = [col[0] for col in cursor.description]
        filas = cursor.fetchall()

        if not filas:
            print(f"La tabla '{nombre_tabla}' está vacía.")
            return

        # Determinar el ancho máximo de cada columna
        anchos = []
        for i, col in enumerate(columnas):
            max_col = len(col)
            max_dato = max(len(str(fila[i])) for fila in filas)
            anchos.append(max(max_col, max_dato) + 2)

        # Encabezado
        encabezado = "".join(col.ljust(anchos[i]) for i, col in enumerate(columnas))
        print(encabezado)
        print("-" * len(encabezado))

        # Filas
        for fila in filas:
            fila_formateada = "".join(str(fila[i]).ljust(anchos[i]) for i in range(len(columnas)))
            print(fila_formateada)

    except mysql.connector.Error as e:
        print(f"Error al mostrar la tabla '{nombre_tabla}':", e)