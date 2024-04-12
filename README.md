# Aplicación Node.js con TypeScript y JWT

## Instalación
1. Clonar el repositorio
2. Ejecutar `npm install` para instalar las dependencias

## Configuración
- Crear un archivo `.env` en la raíz del proyecto con la siguiente línea:
```
SECRET_KEY=your_secret_key_here
```

## Ejecución
- Ejecutar `npm start` para iniciar el servidor

## Uso
- Acceder a `http://localhost:3000/login` con el método POST y enviar el siguiente JSON en el cuerpo de la solicitud:
```json
{
  "username": "user",
  "password": "password"
}
```
- Esto devolverá un token JWT que se puede utilizar en las siguientes solicitudes.

- Acceder a http://localhost:3000/posts y http://localhost:3000/users con el token JWT en el encabezado Authorization para obtener datos de publicaciones y usuarios, respectivamente.