import { Router } from "express";

import { getRoles, createRol, getRol, updateRol } from "../controllers/rol.controller";

const router = Router();

router.route('/')
    .get(getRoles)
    .post(createRol);

router.route('/:idRol')
    .get(getRol)
    .put(updateRol)

export default router;