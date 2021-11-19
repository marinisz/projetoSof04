import express from 'express';
import router from './routes';

const PORT = process.env.PORT || 3000

const app = express();

app.use('/api/', router)

app.listen(PORT, () => { console.log('Serve listening on port', PORT)});
