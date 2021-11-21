import { Router } from 'express';
import api from '../controllers/UsuarioControllere';

const router = Router();

router.post('/login', api.login);
router.post('/cadastrar', api.cadastrar);

export default router;
