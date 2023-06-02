import { Router } from "express";

import { getRoles, getRol } from "../controllers/rol.controller";

const router = Router();

router.route('/')
    .get(getRoles)

router.route('/:idRol')
    .get(getRol)

export default router;