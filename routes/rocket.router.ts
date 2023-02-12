import { Router  } from 'express';
import { getRocket, createRocket, getRocketByid, updateRocket } from './rocket.controller';
 const middlewareFuncs= require('../middleware/checkWalletHeader')
const createRouter = Router();

createRouter.post('/', createRocket)
createRouter.use(middlewareFuncs.checkWalletHeader)
// Create and receive a new rocket

createRouter.get('/', getRocket)

createRouter.post('/updateMetaData', updateRocket)

createRouter.get('/:id', getRocketByid)


export default createRouter