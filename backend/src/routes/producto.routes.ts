import { Router } from "express";

import { getProductos, createProducto, getProducto, deleteProducto, updateProducto } from "../controllers/producto.controller";

const router = Router();

router.route('/')
    .get(getProductos)
    .post(createProducto);

router.route('/:idProducto')
    .get(getProducto)
    .delete(deleteProducto)
    .put(updateProducto)

export default router;