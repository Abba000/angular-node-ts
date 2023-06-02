import { Router } from "express";

import { getDetallesVenta, createDetalleVenta, getDetalleVenta, deleteDetalleVenta, updateDetalleVenta } from "../controllers/detalle-venta.controller";

const router = Router();

router.route('/')
    .get(getDetallesVenta)
    .post(createDetalleVenta);

router.route('/:idDetalleVenta')
    .get(getDetalleVenta)
    .delete(deleteDetalleVenta)
    .put(updateDetalleVenta)

export default router;