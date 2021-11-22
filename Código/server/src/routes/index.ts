import { Router } from 'express';
import empresaRouter from './empresa';
import usuarioRouter from './usuario';
import alunoRouter from './aluno';
import instituicaoRouter from './instituicao';

const router = Router();

router.use('/empresas', empresaRouter);
router.use('/usuarios', usuarioRouter);
router.use('/alunos', alunoRouter);
router.use('/instituicoes', instituicaoRouter);

export default router;
