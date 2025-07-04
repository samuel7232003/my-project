import { Router } from 'express';
import { getUsers, createUser, login } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/login', login);

export default router; 