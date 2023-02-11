import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';

const app = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}))




