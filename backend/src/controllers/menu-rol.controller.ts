import { Request, Response } from "express";

import pool from "../database";

export async function getMenuRoles(req: Request, res: Response): Promise<Response> {
    try {
        const menuRoles = await pool.query('SELECT * FROM MenuRol');    
        return res.json(menuRoles[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los menu roles' });
    }
}

export async function getMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenuRol } = req.params;
        const menuRol = await pool.query('SELECT * FROM MenuRol WHERE idMenuRol = ?', [idMenuRol]);

        if (menuRol.length > 0) {
            return res.json(menuRol[0]);
        } else {
            return res.status(404).json({ message: 'El menu rol no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el menu rol'});
    }
}

export async function createMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO MenuRol SET ?', [req.body]);

        return res.json({
            message: 'Menu rol creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el menu rol'});
    }
}

export async function updateMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenuRol } = req.params;
        await pool.query('UPDATE MenuRol SET? WHERE idMenuRol = ?', [req.body, idMenuRol]);

        return res.json({
            message: 'Menu rol editado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el menu rol'});
    }
}

export async function deleteMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenuRol } = req.params;
        await pool.query('DELETE FROM MenuRol WHERE idMenuRol = ?', [idMenuRol]);

        return res.json({
            message: 'Menu rol eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el menu rol'});
    }
}