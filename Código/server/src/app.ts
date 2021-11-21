import express from 'express';
import router from './routes';
import { basicErrorHandler } from './appsupport';

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use('/api/', router)

app.use(basicErrorHandler)
app.listen(PORT, () => { console.log('Serve listening on port', PORT)});
