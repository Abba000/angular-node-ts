import { Router } from "express";

import { getMenuRoles, createMenuRol, getMenuRol, deleteMenuRol, updateMenuRol } from "../controllers/menu-rol.controller";

const router = Router();

router.route('/')
    .get(getMenuRoles)
    .post(createMenuRol);

router.route('/:idMenuRol')
    .get(getMenuRol)
    .delete(deleteMenuRol)
    .put(updateMenuRol)

export default router;