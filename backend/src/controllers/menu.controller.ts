import { Request, Response } from "express";

import { connect } from "../database";
import { Menu } from "../interfaces/menu.interface";

export async function getMenus(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const menus = await conn.query('SELECT * FROM Menu');
        await conn.end();
    
        return res.json(menus[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los menus' });
    }
}

export async function createMenu(req: Request, res: Response): Promise<Response> {
    try {
        const newMenu: Menu = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Menu SET ?', [newMenu]);

        return res.json({
            message: 'Menu creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el menu'});
    }
}

export async function getMenu(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenu;
        const conn = await connect();
        const menu = await conn.query('SELECT * FROM Menu WHERE idMenu = ?', [id]);

        return res.json(menu[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el menu'});
    }
}

export async function deleteMenu(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenu;
        const conn = await connect();
        await conn.query('DELETE FROM Menu WHERE idMenu = ?', [id]);

        return res.json({
            message: 'Menu eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el menu'});
    }
}

export async function updateMenu(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenu;
        const updateMenu: Menu = req.body;
        const conn = await connect();
        await conn.query('UPDATE Menu SET? WHERE idMenu = ?', [updateMenu, id]);

        return res.json({
            message: 'Menu editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el menu'});
    }
}