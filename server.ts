import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import rocketRouter from './routes/rocket.router';

const app = express();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}))
app.use(cors())
app.use('/rocket', rocketRouter)
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.listen(4000, ()=> {
    console.log("Server is running!")
});




