import { Request, Response } from "express";

import pool from "../database";

export async function getDetallesVenta(req: Request, res: Response): Promise<Response> {
    try {
        const detallesVenta = await pool.query('SELECT * FROM DetalleVenta');
        return res.json(detallesVenta[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los detalles de venta' });
    }
}

export async function getDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const { idDetalleVenta } = req.params;
        const detalleVenta = await pool.query('SELECT * FROM DetalleVenta WHERE idDetalleVenta = ?', [idDetalleVenta]);

        if (detalleVenta.length > 0) {
            return res.json(detalleVenta[0]);
        } else {
            return res.status(404).json({ message: 'El detalle de venta no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el detalle de venta'});
    }
}

export async function createDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO DetalleVenta SET ?', [req.body]);

        return res.json({
            message: 'Detalle venta creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el detalle de venta'});
    }
}

export async function updateDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const { idDetalleVenta } = req.params;
        await pool.query('UPDATE DetalleVenta SET? WHERE idDetalleVenta = ?', [req.body, idDetalleVenta]);

        return res.json({
            message: 'Detalle venta editado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el detalle de venta'});
    }
}

export async function deleteDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const { idDetalleVenta } = req.params;
        await pool.query('DELETE FROM DetalleVenta WHERE idDetalleVenta = ?', [idDetalleVenta]);

        return res.json({
            message: 'Detalle venta eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el detalle de venta'});
    }
}