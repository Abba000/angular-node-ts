import { Request, Response } from "express";

import pool from "../database";

export async function getMenus(req: Request, res: Response): Promise<Response> {
    try {
        const menus = await pool.query('SELECT * FROM Menu');
        return res.json(menus[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los menus' });
    }
}

export async function getMenu(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenu } = req.params;
        const menu = await pool.query('SELECT * FROM Menu WHERE idMenu = ?', [idMenu]);

        if (menu.length > 0) {
            return res.json(menu[0]);
        } else {
            return res.status(404).json({ message: 'El menu no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el menu'});
    }
}

export async function createMenu(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO Menu SET ?', [req.body]);

        return res.json({
            message: 'Menu creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el menu'});
    }
}

export async function updateMenu(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenu } = req.params;
        await pool.query('UPDATE Menu SET? WHERE idMenu = ?', [req.body, idMenu]);

        return res.json({
            message: 'Menu editado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el menu'});
    }
}

export async function deleteMenu(req: Request, res: Response): Promise<Response> {
    try {
        const { idMenu } = req.params;
        await pool.query('DELETE FROM Menu WHERE idMenu = ?', [idMenu]);

        return res.json({
            message: 'Menu eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el menu'});
    }
}