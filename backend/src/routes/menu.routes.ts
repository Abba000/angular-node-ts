import { Router } from "express";

import { getMenus, createMenu, getMenu, deleteMenu, updateMenu } from "../controllers/menu.controller";

const router = Router();

router.route('/')
    .get(getMenus)
    .post(createMenu);

router.route('/:idMenu')
    .get(getMenu)
    .delete(deleteMenu)
    .put(updateMenu)

export default router;