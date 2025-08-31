# Proyecto React

## Instalación

Después de clonar el proyecto, instala las dependencias ejecutando:

```bash
npm i
```

## Configuración de Variables de Entorno

Este proyecto requiere dos archivos de configuración de variables de entorno:

### 1. Archivo para desarrollo: `.env.development`

Crea un archivo llamado `.env.development` en la raíz del proyecto con el siguiente contenido:

```
API_URL=http://localhost:8080/api
```

### 2. Archivo para producción: `.env.production`

Crea un archivo llamado `.env.production` en la raíz del proyecto con el siguiente contenido:

```
API_URL=DNS API PRODUCCION
```

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm run dev`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.

## Notas importantes

- Los archivos `.env.development` y `.env.production` no deben ser committeados al repositorio
- Asegúrate de agregar estos archivos a tu `.gitignore` si no están ya incluidos