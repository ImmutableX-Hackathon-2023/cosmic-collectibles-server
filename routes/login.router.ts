import { Router  } from 'express';
import { login } from './login.controller';

const loginRouter = Router();

loginRouter.post('/login', login)

export default loginRouter