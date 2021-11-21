import { Router } from 'express';
import api from '../controllers/EmpresaController';

const router = Router();

router.get('/', api.listar)
router.post('/:cnpj/vantagens', api.cadastrarVantagem);
router.patch('/vantagens/:id', api.alterarVantagem);
router.delete('/vantagens/:id', api.deletarVantagem);

export default router;
