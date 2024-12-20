/********************************************************************************/
/* Procedimiento almacenado que permite controlar las transacciones             */
/* de reserva de clientes                                                       */
/* Daniel Camacho Fonseca                                                       */
/* 19/12/2024                                                                   */
/********************************************************************************/
CREATE OR REPLACE FUNCTION reservar_ticket(
    p_ticket_id INT,
    p_usuario VARCHAR(100)
)
RETURNS TEXT AS $$
DECLARE
    v_resultado TEXT;
BEGIN
    -- Verificar si el ticket ya existe
    IF NOT EXISTS (
        SELECT 1 FROM tickets WHERE ticket_id = p_ticket_id
    ) THEN
        -- Crear el ticket y reservarlo
        INSERT INTO tickets (ticket_id, estado, reservado_por, fecha_reserva)
        VALUES (p_ticket_id, 'reservado', p_usuario, NOW());
        v_resultado := 'Ticket creado y reserva confirmada.';
    ELSE
        -- Intentar actualizar el ticket
        UPDATE tickets
        SET estado = 'reservado',
            reservado_por = p_usuario,
            fecha_reserva = NOW()
        WHERE ticket_id = p_ticket_id AND estado = 'disponible';

        -- Verificar si se realizó la actualización
        IF NOT FOUND THEN
            v_resultado := 'El ticket ya está reservado o no existe.';
        ELSE
            v_resultado := 'Reserva confirmada.';
        END IF;
    END IF;

    RETURN v_resultado;
END;
$$ LANGUAGE plpgsql;
