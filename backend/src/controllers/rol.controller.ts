import { Request, Response } from "express";

import { connect } from "../database";
import { Rol } from "../interfaces/rol.interface";

export async function getRoles(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const roles = await conn.query('SELECT * FROM Rol');
        await conn.end();
    
        return res.json(roles[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los roles' });
    }
}

export async function createRol(req: Request, res: Response): Promise<Response> {
    try {
        const newRol: Rol = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Rol SET ?', [newRol]);

        return res.json({
            message: 'Rol creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el rol'});
    }
}

export async function getRol(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idRol;
        const conn = await connect();
        const roles = await conn.query('SELECT * FROM Rol WHERE idRol = ?', [id]);

        return res.json(roles[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el rol'});
    }
}



export async function updateRol(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idRol;
        const updateRol: Rol = req.body;
        const conn = await connect();
        await conn.query('UPDATE Rol SET? WHERE idRol = ?', [updateRol, id]);

        return res.json({
            message: 'Rol editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el rol'});
    }
}