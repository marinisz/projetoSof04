import { Router } from 'express';
import api from '../controllers/AlunoController';

const router = Router();


router.get('/', api.listarAlunos)
router.get('/:id', api.listarAlunos)
router.put('/:id', api.atualizarAluno);
router.delete('/:id', api.deletarAluno);
router.get('/consultarSaldo/:id', api.consultarSaldo);
router.get('/solicitarVantagem/', api.solicitarVantagem);

export default router;
