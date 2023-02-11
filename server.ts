import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import createRouter from './routes/create.router';

const app = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cors())
app.use('/create', createRouter)
app.use(express.json());
app.use(express.urlencoded({extended: false}))




