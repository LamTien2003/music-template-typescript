import { validateToken } from './../middleware/auth';
import { Router } from 'express';
import { getMyInfo } from '../controllers/user';

const router = Router();

router.get('/myInfo',validateToken, getMyInfo);



export default router;