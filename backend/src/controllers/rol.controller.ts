import { Request, Response } from "express";

import pool from "../database";

export async function getRoles(req: Request, res: Response): Promise<Response> {
    try {
        const roles = await pool.query('SELECT * FROM Rol');
        return res.json(roles[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los roles' });
    }
}

export async function getRol(req: Request, res: Response): Promise<Response> {
    try {
        const { idRol } = req.params;
        const rol = await pool.query('SELECT * FROM Rol WHERE idRol = ?', [idRol]);

        if (rol.length > 0) {
            return res.json(rol[0]);
        } else {
            return res.status(404).json({ message: 'El rol no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el rol'});
    }
}