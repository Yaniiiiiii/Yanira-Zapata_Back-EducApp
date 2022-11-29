import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
    origin: 'trustedwebsite.com',
};
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API Express / Songs').end();
});
