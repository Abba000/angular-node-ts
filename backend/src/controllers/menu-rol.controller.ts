import { Request, Response } from "express";

import { connect } from "../database";
import { MenuRol } from "../interfaces/menu-rol.interface";

export async function getMenuRoles(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const menuRoles = await conn.query('SELECT * FROM MenuRol');
        await conn.end();
    
        return res.json(menuRoles[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los menu roles' });
    }
}

export async function createMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const newMenuRol: MenuRol = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO MenuRol SET ?', [newMenuRol]);

        return res.json({
            message: 'Menu rol creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el menu rol'});
    }
}

export async function getMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenuRol;
        const conn = await connect();
        const menuRol = await conn.query('SELECT * FROM MenuRol WHERE idMenuRol = ?', [id]);

        return res.json(menuRol[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el menu rol'});
    }
}

export async function deleteMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenuRol;
        const conn = await connect();
        await conn.query('DELETE FROM MenuRol WHERE idMenuRol = ?', [id]);

        return res.json({
            message: 'Menu rol eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el menu rol'});
    }
}

export async function updateMenuRol(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idMenuRol;
        const updateMenuRol: MenuRol = req.body;
        const conn = await connect();
        await conn.query('UPDATE MenuRol SET? WHERE idMenuRol = ?', [updateMenuRol, id]);

        return res.json({
            message: 'Menu rol editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el menu rol'});
    }
}