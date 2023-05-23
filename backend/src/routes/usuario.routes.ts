import { Router } from "express";

import { getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario } from "../controllers/usuario.controller";

const router = Router();

router.route('/')
    .get(getUsuarios)
    .post(createUsuario);

router.route('/:idUsuario')
    .get(getUsuario)
    .delete(deleteUsuario)
    .put(updateUsuario)

export default router;