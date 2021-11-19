import { Router } from 'express';
import empresaRouter from './empresa';
const router = Router();

router.use('/empresas', empresaRouter);
export default router;
