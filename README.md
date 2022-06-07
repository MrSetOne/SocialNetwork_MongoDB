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

| Method | EndPoint | Role | Params | Body | Usage | Ref |
 ------- | -------- | ---- | ------ | ---- | ----- | --- |
| POST | localhost:YourPort/users/ | NA | :x: | :heavy_check_mark: | Crear nuevo usuario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#0ff61f4f-673d-4cd4-adec-304c39c7fdb5)
