<h1 align=center >CANTASTIK</h1>

* Sobre el proyecto

    * Tecnologías utilizadas 

    * Instalación y despliegue XXXXXXXXXXXXXXXXXXXXXX

    * Origen XXXXXXXXXXXXXXXXXXX

    * Objetivos

    * Concepto e inspiración

* Documentacion de API

* Retos presentados

    * Borrar usuario y todo su rastro

    * Validacion de email

    * Middelware de errores

    * Seleccion de DB

    * Problemas varios con email de confirmacion

* Agradecimientos

* En el tintero

    * Documentacion de API con Swagger

    * Testing con Jest y Supertest

* Autor

# Sobre el proyecto

## Tecnologias utilizadas

<!-- FALTA INTRODUCIR IMAGENES -->

## Instalación y despliegue

En el caso de querer usar el proyecto en un servidor local tienes que hacer los siguientes pasos:

* Introducir en la terminal el comando `https://github.com/MrSetOne/SocialNetwork_MongoDB.git` para descargarte el repositorio.

* Dentro de la carpeta del repositorio ejecuta `npm i` para instalar las dependencias necesarias.

* En la raiz del proyecto encontraras el archivo ".env-example", este archivo carga las configuraciones de la base de datos, puerto local, contraseña de JsonWebToken y los datos de nodemailer. Haz una copia, llamala ".env" y rellena los campos como se indica en el archivo, ten en cuenta que para usar nodemailer es necesario una cuenta de Outlook

* Dentro de la carpeta del repositorio ejecuta `npm start` para ejecutar el servidor en local.

## Origen

Es un proyecto planteado como ejercicio del Bootcamp de FullStack en [TheBridge](https://www.thebridge.tech/), consiste en generar el BackEnd de una red social basado principalmente en NodeJS y MongoDB. Parte de la intencion de este ejercicio es trabajar la buenas practicas de "clean code" y el uso de ramas en GIT


# Documenteacion de API

Por falta de tiempo la documentacion ha sido realizada con Postman, aunque lo correcto hubiese sido hacerla con Swagger, aquí pongo unas tablas resumiendo los endpoints, aunque tambien pueder ver la documentacion completa haciendo [click aquí](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ).

## Usuarios

| Method | EndPoint | Auth | Params | Body | Usage | Ref |
 ------- | -------- | ---- | ------ | ---- | ----- | --- |
| POST | localhost:YourPort/users/ | NA | :x: | :heavy_check_mark: | Crear nuevo usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#0ff61f4f-673d-4cd4-adec-304c39c7fdb5) |
| PUT | localhost:YourPort/users/login | NA | :x: | :heavy_check_mark: | Hacer LogIn | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#3eae821e-cff1-4ff9-8d80-05451947a00b) |
| PUT | localhost:YourPort/users/logout | User | :x: | :x: | Hacer LogOut | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#9b732fdd-66aa-442d-b1ea-f60dd5e13034) |
| PUT | localhost:YourPort/users/modify | User | :x: | :heavy_check_mark: | Modificar usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#a869fea9-3254-43c5-ac71-1b45809e4615) |
| DELETE | localhost:YourPort/users/id/:_id | User | :heavy_check_mark: | :x: | Usuario se borra a si mismo | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#6433e145-ee2c-4336-b53f-4406f0b7092e) |
| DELETE | localhost:YourPort/users/admin/:_id | Admin | :heavy_check_mark: | :x: | Admin borra a usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#3a718814-1a87-41c5-9094-e677db7a0476) |
| GET | localhost:YourPort/users/ | User | :x: | :x: | Obtener todos los usuarios | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#8d7dc4da-e101-43f3-a851-e169d0f96a1f) |
| GET | localhost:YourPort/users/admin | Admin | :x: | :x: | Obtener toda la informacion de usuarios | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#f090dd4f-9f3c-4a8e-8537-15ab80c9b182) |
| GET | localhost:YourPort/users/session | User | :x: | :x: | Obtener informacion de sesión | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#bae41500-81c3-401a-8971-9bb1d9b84b7f) |
| GET | localhost:YourPort/users/id/:_id | User | :heavy_check_mark: | :x: | Obtener informacion por id de usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#02a294de-53bc-4955-83cf-2f2d78a35d7b) |
| GET | localhost:YourPort/users/user/:username | User | :heavy_check_mark: | :x: | Buscar usuario por nombre | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#2d0a2dfe-d847-442e-8621-749276487807) |
| PUT | localhost:YourPort/users/follow/:_id | User | :heavy_check_mark: | :x: | Dar Follow a usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#be2da517-7e16-4823-8f78-41bcab350271) |
| PUT | localhost:YourPort/users/unfollow/:_id | User | :heavy_check_mark: | :x: | Dar Unfollow a usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#c8f22416-84fb-4093-9f95-b63ea6b1d1e6) |
| PUT | localhost:YourPort/users/admin/:_id | Admin | :heavy_check_mark: | :x: | Hacer a un usuario Admin | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#228a21b4-ee37-44cb-8e92-14b2d613eb16) |

## Posts

| Method | EndPoint | Auth | Params | Body | Usage | Ref |
 ------- | -------- | ---- | ------ | ---- | ----- | --- |
| POST | localhost:YourPort/posts/ | User | :x: | :heavy_check_mark: | Crear un nuevo post | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#8b397c94-a1b4-4fb6-8b54-e5ff4a408829) |
| PUT | localhost:YourPort/posts/id/:_id | Author | :heavy_check_mark: | :heavy_check_mark: | Modificar un post | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#43843463-8971-4844-bf21-7523a8c39ba5) |
| DELETE | localhost:YourPort/posts/admin/id/:_id | Admin | :heavy_check_mark: | :x: | Eliminar un post como admin | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#eb4ba9a3-2075-4ffa-a118-2cc5b1f19bc0) |
| DELETE | localhost:YourPort/posts/id/:_id | Author | :heavy_check_mark: | :x: | Eliminar un post como autor | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#257502e5-d0c0-4d2f-8684-49f82179877b) |
| GET | localhost:YourPort/posts/?page=:page&limit=:limmit | User | :heavy_check_mark: | :x: | Obtener todos los posts | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#b56c1759-9413-4d71-aaf5-e5c5f46e3dec) |
| GET | localhost:YourPort/posts/title/:title | User | :heavy_check_mark: | :x: | Buscar posts por titulo | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#d44948f4-e883-43a1-835f-4ecbbab75177) |
| GET | localhost:YourPort/posts/id/:_id | User | :heavy_check_mark: | :x: | Obtener post por id | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#6f13611f-4397-4f02-a846-f0fd877e0eb3) |
| PUT | localhost:YourPort/posts/like/id/:_id | User | :heavy_check_mark: | :x: | Dar like a un post | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#f6e60538-7a01-406a-8700-fc12b939dd51) |
| PUT | localhost:YourPort/posts/unlike/id/:_id | User | :heavy_check_mark: | :x: | Quitar like a un post | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#1a9e103c-51a5-4ae3-9d38-1353afd9f3d4) |

## Comentarios

| Method | EndPoint | Auth | Params | Body | Usage | Ref |
 ------- | -------- | ---- | ------ | ---- | ----- | --- |
| POST | localhost:YourPort/comments/id/:_id | User | :heavy_check_mark: | :heavy_check_mark: | Crear un comentario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#39aa3b81-b086-4669-9e00-bbe6c5950d15) |
| PUT | localhost:YourPort/comments/id/:_id | Author | :heavy_check_mark: | :heavy_check_mark: | Modificar un comentario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#149be17a-4e4e-4485-ba1e-444d9dea254f) |
| DELETE | localhost:YourPort/comments/id/:_id | Author | :heavy_check_mark: | :x: | Autor elimima comentario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#a26e7b22-e115-4c69-b38b-29cea39531fc) |



