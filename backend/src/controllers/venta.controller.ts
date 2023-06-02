import { Request, Response } from "express";

import pool from "../database";

export async function getVentas(req: Request, res: Response): Promise<Response> {
    try {
        const ventas = await pool.query('SELECT * FROM Venta');
        return res.json(ventas[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener las ventas' });
    }
}

export async function getVenta(req: Request, res: Response): Promise<Response> {
    try {
        const { idVenta } = req.params;
        const venta = await pool.query('SELECT * FROM Venta WHERE idVenta = ?', [idVenta]);

        if (venta.length > 0) {
            return res.json(venta[0]);
        } else {
            return res.status(500).json({ message: 'La venta no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener la venta'});
    }
}

export async function createVenta(req: Request, res: Response): Promise<Response> {
    try {
        const result = await pool.query('INSERT INTO Venta (numeroDocumento, tipoPago, total, fechaRegistro) VALUES (?, ?, ?, ?)', 
        [req.body.numeroDocumento, req.body.tipoPago, req.body.total, req.body.fechaRegistro]);

        const ventaId = req.body.idVenta;

        for (const detalle of req.body.detalleVenta) {
            await pool.query('INSERT INTO DetalleVenta (idVenta, idProducto, cantidad, precio, total) VALUES (?, ?, ?, ?, ?)', 
            [ventaId, detalle.idProducto, detalle.cantidad, detalle.precio, detalle.total]);
        }

        return res.json({
            message: 'Venta creada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el venta' + err});
        console.log(err);
    }
}