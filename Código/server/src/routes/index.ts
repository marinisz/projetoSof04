import { Router } from 'express';
import empresaRouter from './empresa';
import usuarioRouter from './usuario';
import alunoRouter from './aluno';
const router = Router();

router.use('/empresas', empresaRouter);
router.use('/usuarios', usuarioRouter);
router.use('/alunos', alunoRouter);

export default router;
