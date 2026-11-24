# AllySafe — Frontend Web & PWA (Módulo DAD)

Aplicación web progresiva (PWA) desarrollada en **React** para la consulta de alimentos, gestión de despensa personal y control de alérgenos e intolerancias alimentarias. Forma parte del Proyecto Interdisciplinar **AllySafe** y se comunica mediante peticiones REST con el backend en Spring Boot.

---

## 1. Stack Tecnológico

* **Librería principal:** React (con Vite como empaquetador).
* **Estilos y diseño:** Tailwind CSS (`@tailwindcss/vite`) y tipografía `Inter`.
* **Enrutamiento:** React Router DOM (`BrowserRouter`, `Routes`, `Route`) con carga diferida (`React.lazy` y `Suspense`).
* **Iconografía:** `lucide-react`.
* **Persistencia en cliente:** `sessionStorage` (gestión de sesión activa) y `localStorage` (preferencias de tema y accesibilidad).
* **PWA & Offline:** Web App Manifest (`manifest.json`) y Service Worker nativo (`sw.js`).

---

## 2. Arquitectura y Estructura del Proyecto

El código fuente sigue una arquitectura modular basada en componentes reutilizables, contextos globales y servicios desacoplados:

```text
AllySafe-Proyecto-Interdisciplinar/
├── public/
│   ├── favicon.svg              # Icono vectorial de la aplicación
│   ├── icon-192.png             # Icono PWA 192x192 px
│   ├── icon-512.png             # Icono PWA 512x512 px
│   ├── manifest.json            # Configuración de instalabilidad PWA
│   └── sw.js                    # Service Worker (caché App Shell y soporte offline)
├── src/
│   ├── components/
│   │   ├── BuscadorFiltros.jsx  # Barra de búsqueda validada, selectores y chips de filtros
│   │   ├── FoodResults.jsx      # Listado de alimentos con tarjetas desplegables y acciones CRUD
│   │   └── Header.jsx           # Cabecera de navegación y estado de conexión
│   ├── context/
│   │   └── ThemeContext.jsx     # Gestión global de modo oscuro y tamaño de fuente
│   ├── pages/
│   │   ├── AddFood.jsx          # Formulario dual para alta (POST) y edición (PUT) de alimentos
│   │   ├── Home.jsx             # Vista principal de despensa, filtros y resultados
│   │   ├── Login.jsx            # Inicio de sesión con validación
│   │   ├── Register.jsx         # Registro de nuevos usuarios con validación
│   │   └── Settings.jsx         # Perfil de usuario, alergias, accesibilidad y cierre de sesión
│   ├── services/
│   │   └── api.js               # Cliente HTTP centralizado hacia la API REST (puerto 8080)
│   ├── App.jsx                  # Definición de rutas, Lazy Loading y control de error 404
│   ├── index.css                # Configuración de Tailwind CSS y variables de tema
│   └── main.jsx                 # Punto de entrada y registro del Service Worker en producción
├── index.html                   # Documento base con metadatos SEO, PWA y accesibilidad
└── vite.config.js               # Configuración de Vite y división de bundles (manualChunks)
