import { Router  } from 'express';
import { createRocket } from './rocket.controller';
import { getRocket } from './get.controller';

const createRouter = Router();

// Create and receive a new rocket
createRouter.post('/', createRocket)

createRouter.get('/', getRocket)

export default createRouter