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
| GET | localhost:8080/users/user/:username | User | :heavy_check_mark: | :x: | Buscar usuario por nombre | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#2d0a2dfe-d847-442e-8621-749276487807) |

