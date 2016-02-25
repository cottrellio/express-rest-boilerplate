import express from 'express';

import * as IndexController from './index/controllers/index';
import * as APIController from './api/controllers/api';
import auth from './middleware/auth';
import loadRouters from './lib/loadRouters';

const router = express.Router();
const routes = loadRouters('api');

/*----------------------------*\
    Routes
\*----------------------------*/

// Index
router.get('/', IndexController.index);

// API
router.get('/api', APIController.index);

// API Authenticate
router.post('/api/authenticate', APIController.authenticate);

// v1
router.use('/api/v1', auth);
router.use('/api/v1', routes.v1);


export default router;