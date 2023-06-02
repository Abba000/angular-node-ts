import { Router } from "express";

import { getVentas, createVenta, getVenta } from "../controllers/venta.controller";

const router = Router();

router.route('/')
    .get(getVentas)
    .post(createVenta);

router.route('/:idVenta')
    .get(getVenta)

export default router;