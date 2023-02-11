import { Router  } from 'express';
import { createRocket } from './rocket.controller';
import { getRocket } from './rocket.controller';
 const middlewareFuncs= require('../middleware/checkWalletHeader')
const createRouter = Router();

createRouter.use(middlewareFuncs.checkWalletHeader)
// Create and receive a new rocket
createRouter.post('/', createRocket)

createRouter.get('/', getRocket)

export default createRouter