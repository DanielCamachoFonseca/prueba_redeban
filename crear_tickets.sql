/**************************************************************************************************/
/* Script para crear la tabla tickets                                                             */
/* Daniel Camacho Fonseca                                                                         */
/* 19/12/2024                                                                                     */
/**************************************************************************************************/

CREATE TABLE tickets (
    ticket_id SERIAL PRIMARY KEY,         
    estado VARCHAR(20) NOT NULL,          -- Estado del ticket ('disponible', 'reservado')
    reservado_por VARCHAR(100),           -- Usuario que reservó el ticket
    fecha_reserva TIMESTAMP            
);
