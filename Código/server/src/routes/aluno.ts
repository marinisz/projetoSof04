import { Router } from 'express';
import api from '../controllers/AlunoController';

const router = Router();


router.get('/', api.listar)
router.get('/consultarSaldo/:id', api.consultarSaldo);
router.get('/solicitarVantagem/', api.solicitarVantagem);

export default router;
