import { Request, Response } from "express";

import { connect } from "../database";
import { NumeroDocumento } from "../interfaces/numero-documento.interface";

export async function getNumerosDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const numeroDocumento = await conn.query('SELECT * FROM NumeroDocumento');
        await conn.end();
    
        return res.json(numeroDocumento[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los numeros de documento' });
    }
}

export async function createNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const newNumeroDocumento: NumeroDocumento = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO NumeroDocumento SET ?', [newNumeroDocumento]);

        return res.json({
            message: 'Numero documento creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el numero de documento'});
    }
}

export async function getNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idNumeroDocumento;
        const conn = await connect();
        const menu = await conn.query('SELECT * FROM NumeroDocumento WHERE idNumeroDocumento = ?', [id]);

        return res.json(menu[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el numero de documento'});
    }
}

export async function deleteNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idNumeroDocumento;
        const conn = await connect();
        await conn.query('DELETE FROM NumeroDocumento WHERE idNumeroDocumento = ?', [id]);

        return res.json({
            message: 'Numero documento eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el numero de documento'});
    }
}

export async function updateNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idNumeroDocumento;
        const updateNumeroDocumento: NumeroDocumento = req.body;
        const conn = await connect();
        await conn.query('UPDATE NumeroDocumento SET? WHERE idNumeroDocumento = ?', [updateNumeroDocumento, id]);

        return res.json({
            message: 'Numero documento editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el numero de documento'});
    }
}