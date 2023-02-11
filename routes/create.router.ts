import { Router  } from 'express';
import { createRocket } from './create.controller';
import { getRocket } from './get.controller';

const createRouter = Router();

createRouter.post('/rocket', createRocket)

createRouter.post('/rocket', getRocket)

export default createRouter