import { Router  } from 'express';
import { createRocket } from './create.controller';

const createRouter = Router();

createRouter.post('/rocket', createRocket)

export default createRouter