import { Router  } from 'express';
import { createRocket } from './create.controller';

const createRouter = Router();

// Create and receive a new rocket
createRouter.post('/rocket', createRocket)

export default createRouter