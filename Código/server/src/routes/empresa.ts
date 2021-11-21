import { Router } from 'express';
import api from '../controllers/EmpresaController';

const router = Router();

router.delete('/:cnpj/vantagens', api.deletarVantagem);
router.post('/:cnpj/vantagens', api.cadastrarVantagem);
router.patch('/:cnpj/vantagens', api.alterarVantagem);
router.delete('/:cnpj/vantagens', api.deletarVantagem);

export default router;
