import { Request, Response } from "express";

import pool from "../database";

export async function getCategorias(req: Request, res: Response): Promise<Response> {
    try {
        const categorias = await pool.query('SELECT * FROM Categoria');
        return res.json(categorias[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener las categorias' });
    }
}

export async function getCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const { idCategoria } = req.params;
        const categoria = await pool.query('SELECT * FROM Categoria WHERE idCategoria = ?', [idCategoria]);

        if (categoria.length > 0) {
            return res.json(categoria[0]);
        } else {
            return res.status(404).json({ message: 'La categoria no existe'});
        }

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener la categoria'});
    }
}

export async function createCategoria(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO Categoria SET ?', [req.body]);

        return res.json({
            message: 'Categoria creada'
        });
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear la categoria'});
    }
}

export async function updateCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const { idCategoria } = req.params;
        await pool.query('UPDATE Categoria SET? WHERE idCategoria = ?', [req.body, idCategoria]);

        return res.json({
            message: 'Categoria editada'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar la categoria'});
    }
}

export async function deleteCategoria(req: Request, res: Response): Promise<Response> {
    try {
        const { idCategoria } = req.params;
        await pool.query('DELETE FROM Categoria WHERE idCategoria = ?', [idCategoria]);

        return res.json({
            message: 'Categoria eliminada'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar la categoria'});
    }
}