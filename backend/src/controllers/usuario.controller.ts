import { Request, Response } from "express";

import { connect } from "../database";
import { Usuario } from "../interfaces/usuario.interface";

export async function getUsuarios(req: Request, res: Response): Promise<Response> {
    try {
        const conn = await connect();
        const usuarios = await conn.query(
            'SELECT Usuario.*, Rol.nombre AS nombreRol FROM Usuario JOIN Rol on Usuario.idRol = Rol.idRol'
        );
        await conn.end();
    
        return res.json(usuarios[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener los usuarios' });
    }
}

export async function createUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const newUsuario: Usuario = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO Usuario SET ?', [newUsuario]);

        return res.json({
            message: 'Usuario creado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo crear el usuario'});
    }
}

export async function getUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idUsuario;
        const conn = await connect();
        const usuario = await conn.query('SELECT * FROM Usuario WHERE idUsuario = ?', [id]);

        return res.json(usuario[0]);
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo obtener el usuario'});
    }
}

export async function deleteUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idUsuario;
        const conn = await connect();
        await conn.query('DELETE FROM Usuario WHERE idUsuario = ?', [id]);

        return res.json({
            message: 'Usuario eliminado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo eliminar el usuario'});
    }
}

export async function updateUsuario(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.idUsuario;
        const updateUsuario: Usuario = req.body;
        const conn = await connect();
        await conn.query('UPDATE Usuario SET? WHERE idUsuario = ?', [updateUsuario, id]);

        return res.json({
            message: 'Usuario editado'
        });
    } catch (err) {
        return res.status(500).json({ message: 'No se pudo editar el usuario'});
    }
}