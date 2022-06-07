<h1 align=center >CANTASTIK</h1>

* Sobre el proyecto

    * Tecnologías utilizadas 

    * Instalación y despliegue 

    * Origen 

    * Objetivos 

    * Concepto e inspiración  

* Documentacion de API 

* Retos presentados

    * Borrar usuario y todo su rastro 

    * Validacion de email 

    * Middelware de errores 

    * Seleccion de DB 

    * Problemas varios con email de confirmacion 

* En el tintero

* Autor

# Sobre el proyecto

## Tecnologias utilizadas

![portada](./assets/toReadme/mongoose.png)

Este proyecto está basado en un servidor de NodeJs con Express. La base de datos es MongoDB y para trabajar con ella usamos Mongoose. También hemos utilizado otros paquetes de NPM como: bcryptjs, dotenv, jsonwebtoken, multer, nodemailer y validator.

## Instalación y despliegue

En el caso de querer usar el proyecto en un servidor local tienes que hacer los siguientes pasos:

* Introducir en la terminal el comando `https://github.com/MrSetOne/SocialNetwork_MongoDB.git` para descargarte el repositorio.

* Dentro de la carpeta del repositorio ejecuta `npm i` para instalar las dependencias necesarias.

* En la raiz del proyecto encontraras el archivo ".env-example", este archivo carga las configuraciones de la base de datos, puerto local, contraseña de JsonWebToken y los datos de nodemailer. Haz una copia, llamala ".env" y rellena los campos como se indica en el archivo, ten en cuenta que para usar nodemailer es necesario una cuenta de Outlook

* Dentro de la carpeta del repositorio ejecuta `npm start` para ejecutar el servidor en local.

## Origen

Es un proyecto planteado como ejercicio del Bootcamp de FullStack en [TheBridge](https://www.thebridge.tech/), consiste en generar el BackEnd de una red social basado principalmente en NodeJS y MongoDB. Parte de la intencion de este ejercicio es trabajar la buenas practicas de "clean code" y el uso de ramas en GIT

## Objetivos

### Endpoints

- [x] Posts

    - [x] Endpoint para crear un post( tiene que estar autenticado)

    - [x] Endpoint para actualizar un post ( tiene que estar autenticado)

    - [x] Endpoint para eliminar un post( tiene que estar autenticado)

    - [x] Endpoint para traer todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post

    - [x] Endpoint para buscar post por nombre

    - [x] Endpoint para buscar post por id

    - [x] Implementa validación a la hora de crear un post para que se rellene todos los campos(salvo la imagen, que no sea requerida) y si no se hace que devuelva un mensaje

    - [x] Paginación de 10 en 10

    - [x] Likes:

        - [x] Endpoint para dar un like a un post

        - [x] Endpoint para quitar like a un post

- [x] Comments

    - [x] Endpoint para crear un comentario en un determinado post

- [x] Usuarios

    - [x] Endpoint para registrar un usuario utilizando bcrypt

    - [x] Implementa el correo de confirmación para el registro

    - [x] Endpoint para login(utilizando bcrypt +JWT)

    - [x] Validación en el login:

        - [x] Si no has confirmado tu correo no puedes conectarte

    - [x] Endpoint que nos traiga la información del usuario conectado

    - [x] Endpoint para el logout

    - [x] Implementa validación a la hora de crear un usuario para que se rellene todos los campos y si no se hace que devuelva un mensaje

- [x] Backend disponible en producción (Heroku).

- [x] Middleware para comprobar la autoría del post a la hora de editar/eliminar el mismo.

### Extras

- [x] Middleware para comprobar la autoría del comentario a la hora de editar/eliminar el mismo.

- [x] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar posts.

- [x] Implementa el middleware multer para poder adjuntar imágenes al crear o actualizar un usuario.

- [x] Implementación de followers:

    - [x] Que puedas seguir a otros usuarios

    - [x] Que puedas dejar de seguir a otros usuarios

- [x] El Endpoint que nos trae la información del usuario conectado, además que nos traiga los posts y el número de seguidores que tiene

- [x] Endpoint que nos trae la información del usuario conectado junto a sus post y número de followers, también que nos muestre el nombre de los followers que siguen al usuario conectado

- [x] El endpoint que trae todos los posts junto a los usuarios que hicieron ese post y junto a los comentarios del post que también traiga los usuarios que hicieron los comentarios

- [x] Endpoint para buscar usuario por nombre

- [x] Endpoint para buscar usuario por id

- [x] Aplica lo aprendido de testing con Jest y Supertest en alguna parte de tu proyecto, por ejemplo en la parte encargada de los endpoints de usuario

- [x] Crea una documentación de tu proyecto

- [x] Comments

    - [x] CRUD comments

    - [x] Likes

        - [x] Dar un like a un comentario

        - [x] Quitar like a un comentario

## Concepto e inspiracion

La idea de esta red social "Cantastik" surge de la necesidad de anonimato que requiere el mundo del graffiti, por falta de tiempo no se han podido realizar algunas implementaciones que dejarian ver mejor el enfoque del proyecto, como podria ser la implementacion de crews.

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
| DELETE | localhost:YourPort/comments/admin/id/:_id | Admin | :heavy_check_mark: | :x: | Admin elimina comentario | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#0aebb9aa-606c-4414-89f8-d9219f7c6d61) |
| PUT | localhost:YourPort/comments/like/id/:_id | User | :heavy_check_mark: | :x: | Añadir like | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#9b4a7755-ef3c-4d31-a3c5-e17f515082b1) |
| PUT | localhost:YourPort/comments/unlike/id/:_id | User | :heavy_check_mark: | :x: | Quitar like | [Link](https://documenter.getpostman.com/view/21013360/Uz5KjZHZ#d5d6e8aa-50c4-4ce0-92e5-4183291d4990) |

# Retos presentados

## Borrar usuario y todo su rastro

El borrar un usuario es un proceso complejo, ya que un usuario contiene muchas relaciones y algunas de estas relaciones a su vez tienen más relaciones, para soluciona esto he creado un middelware el cual se ejecuta antes de ejecutarse la funcion del controlador.

```JavaScript
const deleterUser = async(req, res, next) => {
    try {
        let target = await User.findById(req.params._id);
        if (target.postIds) {
            target.postIds.forEach(async(post) => {
                const targetPost = await Post.findById(post);
                if (targetPost.likes) {
                    targetPost.likes.forEach(async(like) => {
                        await User.findByIdAndUpdate(like, { $pull: { likedPosts: targetPost._id } });
                    })
                }
                if (targetPost.comments) {
                    targetPost.comments.forEach(async(comment) => {
                        const toDelete = await Comment.findById(comment);
                        await User.findByIdAndUpdate(toDelete.author, { $pull: { comments: comment } });
                        await Comment.findByIdAndDelete(comment);
                    })
                }
                await User.findByIdAndUpdate(req.params._id, { $pull: { postIds: post } })
                await Post.findByIdAndDelete(post)
            })
        };
        target = await User.findById(req.params._id);
        if (target.comments) {
            target.comments.forEach(async(comment) => {
                const toDelete = await Comment.findById(comment);
                await Post.findByIdAndUpdate(toDelete.postId, { $pull: { comments: comment } });
                await Comment.findByIdAndDelete(comment);
            })
        };
        target = await User.findById(req.params._id);
        if (target.followers) {
            target.followers.forEach(async(follower) => {
                await User.findByIdAndUpdate(follower, { $pull: { following: target._id } })
            })
        };
        target = await User.findById(req.params._id);
        if (target.following) {
            target.following.forEach(async(follow) => {
                await User.findByIdAndUpdate(follow, { $pull: { followers: target._id } })
            })
        };
        target = await User.findById(req.params._id);
        if (target.likedPosts) {
            target.likedPosts.forEach(async(like) => {
                await Post.findByIdAndUpdate(like, { $pull: { likes: target._id } })
            })
        }
        next()
    } catch (error) {
        res.send({ msg: 'Error en el middelware de borrado', error })
    }
}
```
Como se puede observar se ejecutan una serie de bucles que recorren las referencia y van eliminando de forma procedimental todos los registros relacionados con ellas.

Este codigo se podria refactorizar, pero por falta de tiempo no ha sido viable hacerlo.

## Validacion de email

Para la validacion del email originalmente se propuso usar RegExp, en lugar de eso instalamos la libreria validator, la cual realiza esta verificacion sin necesidad de picar un RegExp con los posibles fallos que esto te pueda acarrear.

## Middelware de errores 

Para la gestion de errores cree mi propio middelware de errores, basandome en las tipologias que arrojaban estos mismos, descubrí varios patrones que se repetian dependiendo del tipo de error que se arrojase. El codigo resultante fué el siguiente: 

```JavaScript
const TypeError = (error, req, res, next) => {
    if (error.errors) {
        error.feedback = []
        for (const fail in error.errors) {
            error.feedback.push({ path: error.errors[fail].path, message: error.errors[fail].message });
        };
        console.log(error.feedback);
        return res.status(400).send({
            message: 'Error en la validacion de los campos:',
            feedback: error.feedback
        });
    } else if (error.keyPattern) {
        const failed = Object.keys(error.keyPattern);
        const failedValue = error.keyValue[failed[0]];
        return res.status(400).send({
            message: `El ${failed[0]} ${failedValue} ya está en uso.`,
            failedField: failed[0],
            failedValue
        });

    } else if (error.kind == "ObjectId") {
        return res.send(`El id ${error.value} no existe`)
    } else {
        return res.status(500).send({ message: `Algo ha fallado en el controlador de ${error.origin}`, error });
    }
};
```

Este middleware te devuelve un error simplificado y mas amigable con el FrontEnd, que al final va a ser el consumidor de nuestra API y base de datos.

## Seleccion de DB

El proyecto puede funcionar sobre dos bases de datos, la primera es la de testing y la segunda la del Deploy, esta informacion se encuentra dentro del archivo `.env`, tambien hemos generado un "falso booleando" (Falso porque shell no acepta este tipo de variable) con el que seleccionamos a que base de datos nos vamos a conectar, esto se realiza a través de el archivo `config.js`.

<h3 align=center>.env</h3>

```Powershell
MONGO_URI_TEST = 'Your MongoDB testing DB'

MONGO_URI = 'Your MongoDB deploy DB'

DB_TEST = true/false
```

<h3 align=center>config.js</h3>

```JavaScript
const dbConnection = async() => {
    try {
        if (DB_TEST == 'true') {
            await mongoose.connect(MONGO_URI_TEST);
            console.log('Te has conectado a la DB de testing');
        } else {
            await mongoose.connect(MONGO_URI);
            console.log('Te has conectado a la DB del deploy');
        }
        console.log("BBDD conectada con éxito");
    } catch (error) {
        console.error(error);
        throw new Error("Algo ha fallado a la hora de conectar con la BBDD");
    }
};
```

## Problemas varios con email de confirmacion

Para conseguir que funcione Nodemailer tuvimos diversos problemas, en primer lugar optamos por utilizar Gmail como sistema de envio, pero este dominio ha protegido sus cuentas para que no se puedan mandar correos de terceros. Despues optamos por utilizar Outlook, el cual costó bastante de hacerlo funcionar (la configuracion dentro de nodemailer.js es correcta), el problema es que tras algunos correos la cuenta se autoprotege y no te deja seguir utilizandola con Nodemailer, este es el motivo por el cual están comentadas las lineas de la 21 a la 32 del controlador de usuarios, en este caso tocará verificar al usuario a través de la base de datos directamente.

# En el tintero

* Documentacion de API con Swagger

* Testing con Jest y Supertest

# Autor

<h2>:mushroom: Mike L. Sánchez</h2>
