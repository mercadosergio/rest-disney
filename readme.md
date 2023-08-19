# Bienvenido al maravilloso mundo de Disney

![](https://4.bp.blogspot.com/-wVqCH-lLaCI/W-VfgKBApGI/AAAAAAAAQ_Q/_boURyzLyjMw3B3DJMiayzyuAxVtg0byQCLcBGAs/s1600/disney%252B.jpg)

A continuación encontrarás la documentación sobre el uso de esta API REST basada en la filmografía de Disney en general.

## Instalación

1. Abrir la consola de tu sistema operativo y tipar <code>git clone https://github.com/mercadosergio/rest-disney.git</code>
2. Ubicarse en la carpeta raiz del proyecto e instalar las dependencias de node con: <code>npm install</code>
3. Crear una base de datos en el servidor de Mysql o cualquiera que soporte este motor.
4. Crear un archivo `.env` con la información de la base de datos y demás atributos apartir del `.env.example`.
5. Este backend tipo REST utiliza un ORM (Sequelize), por lo que existen datos de prueba para su consumo, por ende debera ubicarse por consola en la carpeta raiz y ejecutar los siguientes comandos:

```
npm run migrations:run
npm run seed:run
```

## Endpoints

Mediante esta API REST, se pueden interactuar con los siguientes endpoints.

1. Auth

- POST /auth/register
  Registro de usuario.

- POST /auth/login
  Inicio de sesión

- POST /auth/is-available
  Verifica si el formato email enviado es valido

2. Users

- GET /users
  Lista todos los usuarios

- GET /users/:id
  Lista un usuario específico

3. Genres

- GET /genres
  Lista todos los géneros de peliculas y series

- POST /genres
  Creación de generos

4. Movies

- POST /movies
  Creación de películas/series

- PUT /movies
  Edición de películas/series

- GET /movies
  Lista todas las peliculas/series
- GET /movies?title=xxx
  Filtra por titulo de pelicula
- GET /movies?genre=2xx
  Filtra por género
- GET /movies?order='ASC' o 'DESC'
  Ordena de forma descendente o ascendente por fecha de creación

- GET /movies/:id
  Lista la información de una película/serie especificada por su id

- DELETE /movies
  Elimina una película/serie(soft)

5. Characters

- POST /characters
  Creación de personajes

- PUT /characters
  Edición de personajes

- GET /characters
  Lista todos los personajes
- GET /characters?name=xxx
  Filtra por nombre
- GET /characters?age=2x
  Filtra por edad
- GET /characters?movies=4x
  Filtra por la pelicula en que sale

- GET /characters/:id
  Lista la información de un personaje especificada por su id

- DELETE /characters
  Elimina un personaje(soft)

- POST /asign-character
  Asigna un personaje a una película/serie

## Documentación
Puede encontrar la documentación más a detalle en la ruta `/api/docs`

## Librerias usadas
- bycrypt
- cors
- express
- @hapi/boom
- joi
- Sequelize
- Sequelize-cli
- multer
- dotenv
- mysql2
- jsonwebtoken
- passport
- passport-jwt
- passport-local
- nodemon