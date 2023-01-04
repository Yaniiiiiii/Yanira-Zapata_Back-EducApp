# EducApp

<div align="center">
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="typeScript" alt="JavaScript" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="MySQL"  alt="mongo" width="40" height="40"/>&nbsp;
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
</div>

## Descripción general del proyecto

El proyecto es una "single page application" de tipo "mobile only" en la que los usuarios podrán añadir, modificar y eliminar recursos o ideas referentes al ámbito educativo. Estos recursos podrán ser almacenados por otros usuarios en listas de favoritos, siempre y cuando, se hayan registrado(register) e
iniciado sesión(log in) previamente. 
## Posible extensión
Los usuarios que así lo deseen, podrán poner a la venta sus propios recursos educativos y comprar los de otros usuarios.

## Funciones básicas y endpoints.

La aplicación web incluye las 4 funcionalidades básicas del acrónimo CRUD cuyas siglas en inglés se refieren a: "Create, Read, Update and Delete".

Endopoint: /resources, incluye:
[get]/ [get]/:id [get]/query/:key/:value [post]/ [patch]/:id [delete]/:id

Endopoint: /users, incluye:
[post]/register [post]/login [patch]/addFavorites/:id [patch]/deleteFavorites/:id

## Modelo de datos

User:
name: string,
email: string,
password: string,
role: string,
school: string,
grade: string,
resources: Array de Ids,
favorites: Array de Ids,
carts: Array de Ids,
id: string,

Resource:
title: string,
subject: "math" | "reading" | "science" | "writing" | "pe" | "arts",
grade: "kinder" | "first" | "second" | "third" | "fourth" | "fifth" | "sixth",
description: string,
pages: string,
price: number,
format: string,
owner: Id,
id: string,


## Otra información de interés

- Back-end desarrollado con typescript siguiendo los patrones SOLID.
- Testing unitario con Jest y gestión de calidad con Sonar Cloud.
- Testing e2e
- Base de datos no relacional: Mongo DB

## Instalación de dependencias y ejecución

- npm i
- npm run start
