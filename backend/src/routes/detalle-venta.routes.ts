import { Router } from "express";

import { getDetalleVentas, createDetalleVenta, getDetalleVenta, deleteDetalleVenta, updateDetalleVenta } from "../controllers/detalle-venta.controller";

const router = Router();

router.route('/')
    .get(getDetalleVentas)
    .post(createDetalleVenta);

router.route('/:idDetalleVenta')
    .get(getDetalleVenta)
    .delete(deleteDetalleVenta)
    .put(updateDetalleVenta)

export default router;