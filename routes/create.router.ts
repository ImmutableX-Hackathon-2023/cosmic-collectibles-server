import { Router  } from 'express';
import { createRocket } from './create.controller';
import { getRocket } from './get.controller';

const createRouter = Router();

// Create and receive a new rocket
createRouter.post('/rocket', createRocket)

createRouter.post('/rocket', getRocket)

export default createRouter