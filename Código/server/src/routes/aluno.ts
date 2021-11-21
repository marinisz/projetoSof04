import { Router } from 'express';
import api from '../controllers/EmpresaController';

const router = Router();

router.get('/consultarSaldo/:cpf', api.deletarVantagem);
router.get('/solicitarVantagem/:vid', api.cadastrarVantagem);

export default router;
