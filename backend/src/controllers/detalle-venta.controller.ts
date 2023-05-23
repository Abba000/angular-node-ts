import { Request, Response } from "express";

import { connect } from "../database";
import { DetalleVenta } from "../interfaces/detalle-venta.interface";

export async function getDetalleVentas(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const detalleVenta = await conn.query('SELECT * FROM DetalleVenta');
        await conn.end();
    
        return res.json(detalleVenta[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los detalles de venta' });
    }
}

export async function createDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const newDetalleVenta: DetalleVenta = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO DetalleVenta SET ?', [newDetalleVenta]);

        return res.json({
            message: 'Detalle venta creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el detalle de venta'});
    }
}

export async function getDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idDetalleVenta;
        const conn = await connect();
        const detalleVenta = await conn.query('SELECT * FROM DetalleVenta WHERE idDetalleVenta = ?', [id]);

        return res.json(detalleVenta[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el detalle de venta'});
    }
}

export async function deleteDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idDetalleVenta;
        const conn = await connect();
        await conn.query('DELETE FROM DetalleVenta WHERE idDetalleVenta = ?', [id]);

        return res.json({
            message: 'Detalle venta eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el detalle de venta'});
    }
}

export async function updateDetalleVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idDetalleVenta;
        const updateDetalleVenta: DetalleVenta = req.body;
        const conn = await connect();
        await conn.query('UPDATE DetalleVenta SET? WHERE idDetalleVenta = ?', [updateDetalleVenta, id]);

        return res.json({
            message: 'Detalle venta editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el detalle de venta'});
    }
}