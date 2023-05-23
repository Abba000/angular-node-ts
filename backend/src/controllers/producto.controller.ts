import { Request, Response } from "express";

import { connect } from "../database";
import { Producto } from "../interfaces/producto.interface";

export async function getProductos(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const producto = await conn.query(
            'SELECT Producto.*, Categoria.nombre AS nombreCategoria FROM Producto JOIN Categoria on Producto.idCategoria = Categoria.idCategoria'
        );
        await conn.end();
    
        return res.json(producto[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los productos' });
    }
}

export async function createProducto(req: Request, res: Response): Promise<Response> {
    try {
        const newProducto: Producto = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Producto SET ?', [newProducto]);

        return res.json({
            message: 'Producto creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el producto'});
    }
}

export async function getProducto(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idProducto;
        const conn = await connect();
        const producto = await conn.query('SELECT * FROM Producto WHERE idProducto = ?', [id]);

        return res.json(producto[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el producto'});
    }
}

export async function deleteProducto(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idProducto;
        const conn = await connect();
        await conn.query('DELETE FROM Producto WHERE idProducto = ?', [id]);

        return res.json({
            message: 'Producto eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el producto'});
    }
}

export async function updateProducto(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idNumeroDocumento;
        const updateProducto: Producto = req.body;
        const conn = await connect();
        await conn.query('UPDATE Producto SET? WHERE idProducto = ?', [updateProducto, id]);

        return res.json({
            message: 'Producto editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el producto'});
    }
}