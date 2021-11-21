import { Router } from 'express';
import api from '../controllers/EmpresaController';

const router = Router();

router.delete('/:cpnj/vantagens', api.deletarVantagem);
router.post('/:cpnj/vantagens', api.cadastrarVantagem);
router.patch('/:cpnj/vantagens', api.alterarVantagem);
router.delete('/:cpnj/vantagens', api.deletarVantagem);

export default router;
