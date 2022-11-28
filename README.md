# EducApp

## Descripción general del proyecto

El proyecto es una "single page application" de tipo "mobile only" en la que los usuarios podrán añadir, modificar y eliminar recursos o ideas referentes al ámbito educativo. Estos recursos podrán ser almacenados por otros usuarios en listas de favoritos, siempre y cuando, se hayan registrado(register) e
iniciado sesión(log in) previamente. Además, los usuarios que así lo deseen, podrán poner a la venta sus propios recursos educativos y comprar
los de otros usuarios(extra).

## Funciones básicas y endpoints

La aplicación web incluye las 4 funcionalidades básicas del acrónimo CRUD cuyas siglas en inglés se refieren a: "Create, Read, Update and Delete".

1.  Endopoint: /resources, incluye:

-   GetAll: muestra la lista completa de recursos educativos (/resources/getAll).
-   Get: muestra la página de detalles de cada recurso educativo (/resources/get).
-   Post: Permite que los usuarios logeados suban contenido educativo (/resources/post).
-   Patch: Permite que los usuarios logeados y que hayan subido el recurso educativo puedan modificar sus recursos (/resources/patch).
-   PatchFavorites: Permite que los usuarios logeados y que hayan subido el recurso educativo puedan añadir y eliminar sus recursos a la lista de favoritos(/resources/patchFavorites).
-   Delete: Permite que los usuarios logeados eliminen recursos de su lista de favoritos o de la plataforma (/resources/delete).
-   Find:

    -FindByGrade: encontrar recursos en función del curso escolar (/resources/findByGrade).
    -FindBySubject: encontrar recursos en función de la asignatura (/resources/findBySubject).

2. Endopoint: /users, incluye:

-   Post: cuando los usuarios se registren (/users/register).
-   Post: cuando los usuarios inicien sesión (/users/login).

## Modelo de datos

User:
name: string,
email: string,
password: string,
role: string,
school: string,
grade: string,
resources: Array de ObjectId,
favorites: Array de ObjectId,
carts: Array de ObjectId,
id: string,

Resource:
title: string,
subject: "math" | "reading" | "science" | "writing" | "pe" | "arts",
grade: "kinder" | "first" | "second" | "third" | "fourth" | "fifth" | "sixth",
description: string,
pages: string,
price: number,
format: string,
owner: ObjectId,
id: string,

## Prototipo creado con Figma

https://www.figma.com/proto/0dd80mstJQ1LvW7m1v5LL0/Final-project?node-id=21%3A445&scaling=scale-down&page-id=0%3A1&starting-point-node-id=10%3A288&show-proto-sidebar=1
