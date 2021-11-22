import { Router } from 'express';
import api from '../controllers/InstituicaoController';

const router = Router();

router.get('/', api.listarInstituicaos)
router.get('/:id', api.getInstituicaoById)

export default router;
