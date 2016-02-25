import express from 'express';

import { fetchObject } from '../../../../middleware/fetchObject';
import * as controller from '../controllers/users';
import User from '../../../../models/user';

const router = express.Router();

router.use('/users/:id', fetchObject(User));

router.get('/users', controller.list);
router.post('/users', controller.post);
router.get('/users/:id', controller.get);
router.patch('/users/:id', controller.patch);
router.delete('/users/:id', controller.del);

router.get('/users/me', controller.me);

export default router;