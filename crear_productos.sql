/*******************************************/
/* Script para crear una tabla de productos*/
/* Daniel Camacho Fonseca                  */
/* 19/12/2024                              */
/*******************************************/

CREATE TABLE productos (
id BIGINT PRIMARY KEY IDENTITY(1,1)
, nombre VARCHAR(40) NOT NULL
, precio DECIMAL(10, 2) NOT NULL
, categoria VARCHAR(50) NOT NULL
);