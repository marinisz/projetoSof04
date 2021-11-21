import { Router } from 'express';
import empresaRouter from './empresa';
import usuarioRouter from './usuario';
const router = Router();

router.use('/empresas', empresaRouter);
router.use('/usuario', empresaRouter);

export default router;
