
# Inprocode Frontend

Este es el frontend del proyecto **Inprocode**, desarrollado con **Angular 19**. Este proyecto incluye un calendario interactivo, un mapa con filtros de categorías y gráficos dinámicos para ofrecer una experiencia completa.

## Requisitos previos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (versión recomendada: 18+)
- **NPM** (instalado con Node.js)
- **Angular CLI** (versión recomendada: 16+)


## Clonación del repositorio

Clona el repositorio con el siguiente comando:

```bash
git clone https://github.com/mcallejo-10/S8-Inprocode.git
cd S8-Inprocode
```

## Instalación de dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

## Configuración

Este proyecto está configurado para interactuar con el backend del repositorio [Inprocode Backend](https://github.com/mcallejo-10/S8-Inprocode-Backend.git). Asegúrate de que el backend esté funcionando antes de iniciar el frontend.


## Inicio del servidor de desarrollo

Inicia el servidor con el siguiente comando:

```bash
ng serve
```

El proyecto estará disponible en [http://localhost:4200](http://localhost:4200).

    # Configuración del proyecto Angular


## Características principales

### 1. Calendario (FullCalendar)
- Muestra eventos interactivos con posibilidad de filtrado.
- Permite agregar, editar y eliminar eventos desde un modal.
- Las actualizaciones se sincronizan con el backend.

### 2. Mapa (Leaflet)
- Incluye un mapa con marcadores categorizados.
- Ofrece un filtro dinámico para mostrar categorías específicas.

### 3. Gráficos (Chart.js)
- Muestra estadísticas dinámicas con gráficos personalizables.

### 4. Diseño moderno
- Utiliza **Bootstrap 5** para un diseño limpio y responsivo.



## Recursos adicionales

- [Angular Documentation](https://angular.io/docs)
- [FullCalendar Documentation](https://fullcalendar.io/docs)
- [Leaflet Documentation](https://leafletjs.com/)
- [Chart.js Documentation](https://www.chartjs.org/)

