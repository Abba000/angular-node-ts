import { Router } from "express";

import { getNumerosDocumento, createNumeroDocumento, getNumeroDocumento, deleteNumeroDocumento, updateNumeroDocumento } from "../controllers/numero-documento.controller";

const router = Router();

router.route('/')
    .get(getNumerosDocumento)
    .post(createNumeroDocumento);

router.route('/:idNumeroDocumento')
    .get(getNumeroDocumento)
    .delete(deleteNumeroDocumento)
    .put(updateNumeroDocumento)

export default router;