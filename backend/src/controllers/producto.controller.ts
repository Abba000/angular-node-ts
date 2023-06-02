import { Request, Response } from "express";

import pool from "../database";

export async function getProductos(req: Request, res: Response): Promise<Response> {
    try {
        const productos = await pool.query(
            'SELECT Producto.*, Categoria.nombre AS nombreCategoria FROM Producto JOIN Categoria on Producto.idCategoria = Categoria.idCategoria'
        );
        return res.json(productos[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los productos' });
    }
}

export async function getProducto(req: Request, res: Response): Promise<Response> {
    try {
        const { idProducto } = req.params;
        const producto = await pool.query('SELECT * FROM Producto WHERE idProducto = ?', [idProducto]);

        if (producto.length > 0) {
            return res.json(producto[0]);
        } else {
            return res.status(404).json({ message: 'El producto no existe'});
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el producto'});
    }
}

export async function createProducto(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO Producto SET ?', [req.body]);

        return res.json({
            message: 'Producto creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el producto'});
    }
}

export async function updateProducto(req: Request, res: Response): Promise<Response> {
    try {
        const { idProducto } = req.params;
        await pool.query('UPDATE Producto SET? WHERE idProducto = ?', [req.body, idProducto]);

        return res.json({
            message: 'Producto editado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el producto'});
    }
}

export async function deleteProducto(req: Request, res: Response): Promise<Response> {
    try {
        const { idProducto } = req.params;
        await pool.query('DELETE FROM Producto WHERE idProducto = ?', [idProducto]);

        return res.json({
            message: 'Producto eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el producto'});
    }
}