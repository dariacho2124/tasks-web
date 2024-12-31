# Frontend - Gestión de Usuarios y Tareas

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)
- [Ejecutar la Aplicación](#ejecutar-la-aplicación)
- [Notas Adicionales](#notas-adicionales)

---

## Descripción

Este es el frontend de una aplicación de gestión de tareas que permite a los usuarios autenticarse mediante JWT y realizar operaciones CRUD en las tareas.

- **Usuarios**: Los usuarios pueden iniciar sesión con un usuario predefinido (`admin:admin`).
- **Tareas**: Gestiona tareas con operaciones como creación, visualización, edición y eliminación.
- **Autenticación**: Implementada mediante un formulario de login y protección de rutas con un interceptor para manejar tokens JWT.

---

## Requisitos Previos

1. **Node.js**: Recomendado la versión 14 o superior.
2. **npm** o **yarn**: Para instalar las dependencias.
3. Un backend en funcionamiento para manejar las solicitudes API (ver README del backend).

---

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/dariacho2124/tasks-web.git
   cd tasks-web
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
REACT_APP_API_URL=http://localhost:3300
```

- `REACT_APP_API_URL`: La URL base del backend.

**Nota:** Asegúrate de que el backend esté configurado y ejecutándose en la misma URL.

---

## Estructura del Proyecto

- **`/src`**: Contiene todos los componentes, contextos y configuraciones.
  - **`components/`**: Contiene los componentes de la interfaz como `Login` y `Tasks`.
  - **`context/`**: Implementa el contexto de React para manejar tareas.
  - **`helper/axios.js`**: Configuración de `axios` para manejar las llamadas API y el token JWT.

---

## Características

### 1. **Inicio de Sesión**

- **Ruta:** `/login`
- Permite a los usuarios iniciar sesión con las credenciales predefinidas:
  - Usuario: `admin`
  - Contraseña: `admin-test`
- Al iniciar sesión correctamente, el token JWT se almacena en `sessionStorage`.

### 2. **Gestión de Tareas**

- **Ruta Protegida:** `/`
- Requiere autenticación con un token JWT válido.
- Funcionalidades:
  - **Crear Tareas:** Añade nuevas tareas con título, descripción y estado (`completado` o `pendiente`).
  - **Listar Tareas:** Muestra todas las tareas del usuario.
  - **Editar Tareas:** Permite actualizar detalles de una tarea existente.
  - **Eliminar Tareas:** Elimina tareas seleccionadas.

### 3. **Protección de Rutas**

- Las rutas protegidas verifican la validez del token JWT.
- Si no se detecta un token o este es inválido, el usuario es redirigido a la pantalla de login.

### 4. **Interceptores con Axios**

- Todas las llamadas API incluyen el token JWT en el encabezado `Authorization`.
- Si el token expira o es inválido, el interceptor redirige automáticamente al usuario al login.

---

## Ejecutar la Aplicación

1. Inicia la aplicación en modo desarrollo:

   ```bash
   npm start
   ```

2. Accede a la aplicación desde tu navegador en `http://localhost:3000`.

---

## Notas Adicionales

1. **Uso de Variables de Entorno:**

   - Cambia la URL base del backend según el entorno (`localhost` para desarrollo, una URL pública para producción).

2. **Estilo:**

   - La interfaz utiliza `Tailwind CSS` para estilos predefinidos y diseño responsivo.

3. **Reinicio de Sesión:**

   - Si el token JWT expira o es inválido, el usuario debe volver a iniciar sesión.

4. **API Swagger:**
   - Asegúrate de que el backend esté configurado correctamente para manejar las rutas documentadas en el README del backend.
