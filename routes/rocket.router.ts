import { Router  } from 'express';
import { getRocket, createRocket, getRocketByid, pushRocketToBlockchain , updateRocket} from './rocket.controller';
 const middlewareFuncs= require('../middleware/checkWalletHeader')
const rocketRouter = Router();

rocketRouter.post('/', createRocket)
rocketRouter.use(middlewareFuncs.checkWalletHeader)
// Create and receive a new rocket

rocketRouter.get('/', getRocket)

rocketRouter.post('/upgradeRocket', updateRocket)

rocketRouter.get('/push', pushRocketToBlockchain)

rocketRouter.get('/:id', getRocketByid)



export default rocketRouter
