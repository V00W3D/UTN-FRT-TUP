# 🧾 Auditoría — Semana 3

### Grupo Nº: 6

### Tema asignado: **Sistema de Reservas para Consultorios Médicos**

### Integrantes:

- **Navarro, Víctor Leandro** — Legajo: 61550
- **Gallo, Genaro** — Legajo: 61909
- **Valdez del Pino, Tomás Manuel** — Legajo: 61447

---

## 1) RELEVAMIENTO — Antes de comenzar a trabajar

### 📋 Descripción general del proyecto

El proyecto corresponde al desarrollo de un sistema para la **gestión de turnos, pacientes y profesionales médicos**, con la intención de evitar superposición de horarios y permitir consultas por día o paciente.  
El código presenta una estructura inicial funcional, aunque con varios aspectos pendientes de modularización, consistencia y cumplimiento de buenas prácticas de React.

---

### ⚠️ Errores detectados y observaciones técnicas

#### 🗂️ Estructura del proyecto

- Se identificaron **carpetas vacías o con contenido mínimo**:
  - `utils/helpers.js` → archivo sin contenido.
  - `store/` → sin implementación del estado global (_Zustand_ no utilizado).
  - `constants/constantes.js` → vacío.
- Se observó una carpeta denominada **`router/`** (en lugar de `routes/`), con un uso incorrecto del concepto.
  - Las rutas se encuentran definidas directamente en `App.jsx`, reduciendo la modularidad y escalabilidad.

#### 🔧 Servicios y hooks

- En `services/` se halló únicamente un **servicio simulado de login**, sin integración real con otros módulos.
- El hook `useLogin` concentra la mayoría de la lógica de negocio, dejando el servicio como intermediario superficial.
- No existen servicios para **médicos** ni **turnos**, limitando el alcance del sistema.

#### 🧩 Componentes y páginas

- **Duplicación de lógica** entre componentes y sus respectivas páginas.
  - Ejemplo: un componente `Inicio` y una página `InicioPage` que solo renderiza el mismo componente.
- No se utilizan _layouts_ reutilizables.
  - El archivo `layout/LayoutPrincipal.jsx` está vacío y sin función definida.
- La lógica de cada parte se encuentra **embebida directamente en los componentes**, dificultando el mantenimiento y la legibilidad.

#### 🌐 Rutas y API

- **Duplicación de lógica de conexión a la API** entre dos archivos (`api.js` y `apiConfig.js`).
- El archivo `db.json` del servidor JSON contiene únicamente `usuarios`, sin datos de `doctores` ni `turnos`, lo que impide la prueba completa del sistema.

#### ⚙️ Aspectos generales

- No se detectaron errores críticos de compilación, pero sí **uso ineficiente de dependencias y estructura inconsistente**.
- La carpeta `dashboard/` se encuentra fuera de `components/`, rompiendo la coherencia del árbol de archivos.

---

## 2) SOLUCIONES IMPLEMENTADAS + NUEVO AGREGADO

### ✅ Soluciones aplicadas a problemas detectados

- Reestructuración de carpetas según convenciones de React: `routes/`, `components/`, `layouts/`, `services/`, `store/`, `utils/`.
- Centralización de las rutas mediante un módulo dedicado (`routes/index.jsx`).
- Limpieza de carpetas vacías y eliminación de archivos redundantes.
- Unificación de la lógica de API en un solo archivo.
- Separación de responsabilidades entre _hooks_ y _services_ para mejorar la mantenibilidad.

---

### ✅ Nuevos requerimientos de Semana 2 agregados

- Implementación de endpoints simulados en `db.json` para:
  - **Médicos** (nombre, especialidad, disponibilidad).
  - **Turnos** (fecha, hora, paciente, médico).
- Creación de servicios `turnosService.js` y `medicosService.js`.
- Integración básica de estado global con _Zustand_ en `store/`.
- Reorganización de las páginas bajo un layout estructurado.

---

## Observaciones finales

El proyecto presenta una base funcional, pero carecía de una arquitectura modular clara.  
Tras el relevamiento, se implementaron acciones de refactorización orientadas a **mejorar la escalabilidad, la separación de responsabilidades y la coherencia estructural** del sistema.

El equipo acordó continuar con la implementación de los módulos faltantes (turnos, médicos y pacientes) para completar los requerimientos definidos en el TP.

---
