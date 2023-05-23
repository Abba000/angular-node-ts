import { Router } from "express";

import { getVentas, createVenta, getVenta, deleteVenta, updateVenta } from "../controllers/venta.controller";

const router = Router();

router.route('/')
    .get(getVentas)
    .post(createVenta);

router.route('/:idVenta')
    .get(getVenta)
    .delete(deleteVenta)
    .put(updateVenta)

export default router;