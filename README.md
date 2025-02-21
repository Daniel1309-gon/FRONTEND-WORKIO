# Workio - Sistema de Reservas de Espacios de Coworking

## Descripción
Workio es un sistema web responsive diseñado para la reserva de espacios de coworking en Bogotá. Este proyecto sigue la metodología SCRUM para su desarrollo, permitiendo una gestión ágil y eficiente de sus funcionalidades.

## Características Principales
- Registro e inicio de sesión de usuarios.
- Reserva y gestión de espacios de coworking.
- Diseño responsive para una experiencia óptima en dispositivos móviles y de escritorio.
- Panel de administración para la gestión de espacios y usuarios.
- Integración con pasarelas de pago.
- Notificaciones y recordatorios de reservas.

## Tecnologías Utilizadas
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- [Git](https://git-scm.com/)

## Instalación y Configuración
Sigue estos pasos para configurar el entorno de desarrollo:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/workio-frontend.git
   cd workio-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```

El servidor se ejecutará en `http://localhost:5173/` (por defecto en Vite).

## Estructura del Proyecto
```
workio-frontend/
│── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/            # Páginas principales de la aplicación
│   ├── contexts/         # Contextos globales de la aplicación
│   ├── layouts/          # Estilos globales y configuraciones de Tailwind
│   ├── assets/           # Imagenes que se utilizan dentro del proyecto
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada de la aplicación
│── public/               # Archivos estáticos
│── package.json          # Dependencias y scripts
│── tsconfig.json         # Configuración de TypeScript
│── vite.config.ts        # Configuración de Vite
```

## Contribuciones
Las contribuciones son bienvenidas. Para contribuir:
1. Realiza un fork del repositorio.
2. Crea una nueva rama con tu mejora (`git checkout -b feature/nueva-mejora`).
3. Realiza los cambios y haz un commit (`git commit -m 'Descripción de la mejora'`).
4. Envía un pull request para revisión.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

