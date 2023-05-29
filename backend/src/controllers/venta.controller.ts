import { Request, Response } from "express";

import { connect } from "../database";
import { Venta } from "../interfaces/venta.interface";

export async function getVentas(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const venta = await conn.query('SELECT * FROM Venta');
        await conn.end();
    
        return res.json(venta[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener las ventas' });
    }
}

export async function createVenta(req: Request, res: Response): Promise<Response> {
    try {
        const newVenta: Venta = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Venta SET ?', [newVenta]);

        return res.json({
            message: 'Venta creada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el venta'});
    }
}

export async function getVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idVenta;
        const conn = await connect();
        const venta = await conn.query('SELECT * FROM Venta WHERE idVenta = ?', [id]);

        return res.json(venta[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener la venta'});
    }
}

export async function deleteVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idVenta;
        const conn = await connect();
        await conn.query('DELETE FROM Venta WHERE idVenta = ?', [id]);

        return res.json({
            message: 'Venta eliminada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar la venta'});
    }
}

export async function updateVenta(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idVenta;
        const updateVenta: Venta = req.body;
        const conn = await connect();
        await conn.query('UPDATE Venta SET? WHERE idVenta = ?', [updateVenta, id]);

        return res.json({
            message: 'Venta editada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el venta'});
    }
}