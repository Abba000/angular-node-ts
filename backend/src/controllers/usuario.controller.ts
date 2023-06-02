import { Request, Response } from "express";

import pool from "../database";

export async function getUsuarios(req: Request, res: Response): Promise<Response> {
    try {
        const usuarios = await pool.query(
            'SELECT Usuario.*, Rol.nombre AS nombreRol FROM Usuario JOIN Rol on Usuario.idRol = Rol.idRol'
        );
        return res.json(usuarios[0]);

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los usuarios' });
    }
}

export async function getUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const { idUsuario } = req.params;
        const usuario = await pool.query('SELECT * FROM Usuario WHERE idUsuario = ?', [idUsuario]);

        if (usuario.length > 0) {
            return res.json(usuario[0]);
        } else {
            return res.status(404).json({ message: 'El usuario no existe'});
        }

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el usuario'});
    }
}

export async function createUsuario(req: Request, res: Response): Promise<Response> {
    try {
        await pool.query('INSERT INTO Usuario SET ?', [req.body]);

        return res.json({
            message: 'Usuario creado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el usuario'});
    }
}

export async function updateUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const { idUsuario } = req.params;
        await pool.query('UPDATE Usuario SET? WHERE idUsuario = ?', [req.body, idUsuario]);

        return res.json({
            message: 'Usuario editado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el usuario'});
    }
}

export async function deleteUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const { idUsuario } = req.params;
        await pool.query('DELETE FROM Usuario WHERE idUsuario = ?', [idUsuario]);

        return res.json({
            message: 'Usuario eliminado'
        });

    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el usuario'});
    }
}