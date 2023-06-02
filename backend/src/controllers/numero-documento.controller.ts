import { Request, Response } from "express";

import pool from "../database";

export async function getNumerosDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const numerosDocumento = await pool.query('SELECT * FROM NumeroDocumento');   
        return res.json(numerosDocumento[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los numeros de documento' });
    }
}

export async function getNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const { idNumeroDocumento } = req.params;
        const numerodocumento = await pool.query('SELECT * FROM NumeroDocumento WHERE idNumeroDocumento = ?', [idNumeroDocumento]);

        if (numerodocumento.length > 0) {
            return res.json(numerodocumento[0]);
        } else {
            return res.status(404).json({ message: 'El numero de documento no existe'});
        } 
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el numero de documento'});
    }
}

export async function createNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO NumeroDocumento SET ?', [req.body]);

        return res.json({
            message: 'Numero documento creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el numero de documento'});
    }
}

export async function updateNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const { idNumeroDocumento } = req.params;
        await pool.query('UPDATE NumeroDocumento SET? WHERE idNumeroDocumento = ?', [req.body, idNumeroDocumento]);

        return res.json({
            message: 'Numero documento editado'
        });
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el numero de documento'});
    }
}

export async function deleteNumeroDocumento(req: Request, res: Response): Promise<Response> {
    try {
        const { idNumeroDocumento } = req.params;
        await pool.query('DELETE FROM NumeroDocumento WHERE idNumeroDocumento = ?', [idNumeroDocumento]);

        return res.json({
            message: 'Numero documento eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el numero de documento'});
    }
}