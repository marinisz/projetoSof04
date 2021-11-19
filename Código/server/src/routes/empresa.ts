import { Router } from 'express';
import api from '../controllers/EmpresaController';

const router = Router();

router.get('/', api.gerarCupom);
router.post('/', api.gerarCupom);
router.put('/', api.gerarCupom);
router.delete('/', api.gerarCupom);

export default router;
