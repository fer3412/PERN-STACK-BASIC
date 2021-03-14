# PERN-STACK-BASIC

Este es un ejemplo básico de pern stack la utilización de Postgresql, Express js, React js y Node js. 
Lo que hace este ejemplo es mostrar unos horarios en los cuales se puede insertar un Identificador único (UUID) 
esto para saber cuándo un horario está ocupado por otro cliente.

## Instalación

Programas necesarios

[Node js](https://nodejs.org/es/)

[Postgresql](https://www.postgresql.org/)



1. Instalar todas las dependencias del package.json de las carpetas **client** y **server**

`npm install`

2. Inicializar la aplicación de Postgresql y crear una base de datos con el nombre **tds1**

`CREATE DATABASE tds1;`

   En la base de datos crear una tabla con el nombre **mototb** y con sus respetivas columnas **idm**, **date_m**, **slot_m** y **uuid**
   ```
   CREATE TABLE mototb(
   idm SERIAL PRIMARY KEY,
   date_m text NOT NULL,
   slot_m text NOT NULL,
   uuid text NOT NULL);
  ```
3. Inicializa server

`node server`

4. Inicializa client 

`npm run start`
