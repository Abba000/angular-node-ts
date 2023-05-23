import { Request, Response } from "express";

import { connect } from "../database";
import { Categoria } from "../interfaces/categoria.interface";

export async function getCategorias(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const categoria = await conn.query('SELECT * FROM Categoria');
        await conn.end();
    
        return res.json(categoria[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener las categoria' });
    }
}

export async function createCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const newCategoria: Categoria = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Categoria SET ?', [newCategoria]);

        return res.json({
            message: 'Categoria creada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear la categoria'});
    }
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idCategoria;
        const conn = await connect();
        const categoria = await conn.query('SELECT * FROM Categoria WHERE idCategoria = ?', [id]);

        return res.json(categoria[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener la categoria'});
    }
}

export async function deleteCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idCategoria;
        const conn = await connect();
        await conn.query('DELETE FROM Categoria WHERE idCategoria = ?', [id]);

        return res.json({
            message: 'Categoria eliminada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar la categoria'});
    }
}

export async function updateCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idCategoria;
        const updateCategoria: Categoria = req.body;
        const conn = await connect();
        await conn.query('UPDATE Categoria SET? WHERE idCategoria = ?', [updateCategoria, id]);

        return res.json({
            message: 'Categoria editada'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar la categoria'});
    }
}