import textos
import sqlite3
import sys
import os

def limpiarpantalla():
    os.system('cls' if os.name == 'nt' else 'clear')

def Reiniciar_sistema():
    os.execl(sys.executable, sys.executable, *sys.argv)

def contar_tablas(c):
    c.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tablas = c.fetchall()
    cantidad = len(tablas)
    return cantidad
        
def trycrearBD():
    limpiarpantalla()
    try:
        textos.menu_CrearBD
        salir1 = False
        while not salir1:
            opcion1 = input("Ingrese una opción: ")
            if opcion1 == "1":
                limpiarpantalla()
                nombreBDDactual = "manejobdd_C9_Grupo3.db"
                conn = sqlite3.connect(nombreBDDactual)
                print(f"Base de datos: {nombreBDDactual} creada de manera exitosa")
                salir1 = True
                input()
                return nombreBDDactual, conn
            elif opcion1 == "2":
                limpiarpantalla()
                nombreBDDactual = input("Ingrese el nombre de su Base de datos: ")+".db"
                conn = sqlite3.connect(nombreBDDactual)
                print(f"Base de datos: {nombreBDDactual} creada de manera exitosa")
                salir1 = True
                input()
                return nombreBDDactual, conn
            elif opcion1 == "3":
                sys.exit()
            else:
                print("Opcion no válida.")
            return nombreBDDactual,conn
    except Exception as e:
        limpiarpantalla()
        print(f"Ocurrió un error al crear la base de datos: {e}")
        print("saliendo...")
        input("Presione enter para continuar...")
        sys.exit()

def ConsultarDatos(DB, c):
    limpiarpantalla()
    salir2 = False
    while not salir2:
        tablas = textos.mostrar_DB(DB, c)
        print("===============================")
        if len(tablas) >= 1:
            opcion2 = input("Elija una tabla a mostrar ('x' para salir): ")
            
            if opcion2.lower() == "x":
                salir2 = True
                continue
            elif opcion2.isdigit():
                indice = int(opcion2) - 1
                if 0 <= indice < len(tablas):
                    tabla_seleccionada = tablas[indice][0]
                    try:
                        textos.mostrar_tabla(tabla_seleccionada, c)
                    except Exception as e:
                        print(f"Error al mostrar la tabla: {e}")
                else:
                    print("Índice fuera de rango.")
            else:
                print("Opción no válida.")
        else:
            print("No hay tablas disponibles.")  
            salir2 = True     
            input()

def CrearTabla(c):
    nombre_tabla = input("Nombre de la tabla: ")

    campos = []
    continuar = True

    while continuar:
        nombre_campo = input("Nombre del campo (o 'x' para terminar): ")
        if nombre_campo.lower() == 'x':
            continuar = False
            continue

        print("\nTipo de dato para este campo:")
        print("1. Texto")
        print("2. Número entero")
        print("3. Número decimal")
        print("4. Fecha")
        tipo = input("Seleccione una opción (1-4): ")

        if tipo == "1":
            tipo_sql = "TEXT"
        elif tipo == "2":
            tipo_sql = "INTEGER"
        elif tipo == "3":
            tipo_sql = "REAL"
        elif tipo == "4":
            tipo_sql = "DATE"
        else:
            print("Opción inválida. Se usará TEXT por defecto.")
            tipo_sql = "TEXT"

        campos.append(f"{nombre_campo} {tipo_sql}")

    if campos:
        sentencia_sql = f"""CREATE TABLE {nombre_tabla} (
            id_{nombre_tabla} INTEGER PRIMARY KEY AUTOINCREMENT,
            {', '.join(campos)}
        )"""
        
        c.execute(sentencia_sql)
        conn.commit()
        print(f"Tabla '{nombre_tabla}' creada con éxito.")
    else:
        print("No se agregaron campos. Tabla no creada.")

nombreBDDactual, conn = trycrearBD()
cursor = conn.cursor()
salir = False
while not salir:
    limpiarpantalla()
    TablasCantidad = contar_tablas(cursor)
    textos.menu_Inicio(nombreBDDactual, TablasCantidad)
    opcion = input("Ingrese una opción: ")
    if opcion == "1":
        ConsultarDatos(nombreBDDactual,cursor)
    elif opcion == "2":
        CrearTabla(conn)
    elif opcion == "3":
        InsertarDatos()
    elif opcion == "4":
        ActualizarDatos()
    elif opcion == "5":
        EliminarDatos()
        # os.remove(f"{nombreBDDactual}")
    elif opcion == "6" and nombreBDDactual=="":
        ""
    elif opcion == "7":
        salir = True
    else:
        limpiarpantalla()
        input("Opción no válida. Intente nuevamente...")
    

