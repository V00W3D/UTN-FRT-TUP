def menu_CrearBD():
    print("1. Crear base de datos DEFAULT(Recomendado)")
    print("2. Crear base de datos propia")
    print("3. Salir")
    print("===========================")
    print('''la base de datos por defecto se llama "manejobdd_C9_Grupo3"''')

def menu_Inicio(DB,TablasCantidad):
    print("|MANEJO DE BASE DE DATOS|")
    print("UTN-FRT - TP2 - 2025 - C9 - TUP 2024 - Base de datos II")
    print("Grupo 3")
    print("Integrantes:")
    print("~~|*|~~ Gallo Genaro")
    print("~~|*|~~ Diaz Rossini Juan José")
    print("~~|*|~~ Liacoplo Gerónimo Emiliano")
    print("~~|*|~~ Navarro Victor Leandro")
    print("==========================")
    print(f"Base de datos actual: {DB}")
    print(f"Cantidad de tablas: {TablasCantidad}")
    print("==========================")
    print("1. Consultar datos")
    print("2. Crear tabla")
    print("3. Insertar datos")
    print("4. Actualizar datos")
    print("5. Eliminar datos")
    print("6.Crear base de datos (solo si ya fue borrada)")
    print("7. Salir")

def mostrar_DB(DB,c):
        c.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tablas = c.fetchall()
        
        print(f"./{DB} : ")
        for i, tabla in enumerate(tablas):
            print("|")
            print(f"->{i+1}./{tabla[0]}")
        return tablas    

def mostrar_tabla(tabla, cursor):
    cursor.execute(f"SELECT * FROM {tabla}")
    columnas = [desc[0] for desc in cursor.description]

    print("\n | ".join(columnas))
    print("-" * 50)
    for fila in cursor.fetchall():
        print(" | ".join(str(valor) for valor in fila))    

