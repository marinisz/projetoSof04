import express from 'express';
import router from './routes';
import prisma from './db';
import cors from 'cors';

import * as http from 'http';
import { basicErrorHandler } from './appsupport';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/', router);

app.use(basicErrorHandler);

const server = http.createServer(app);

const boot = (): void => {
    prisma.$connect().then(() => {
        server.listen(PORT, () => {
            console.log(`Server is up on port ${PORT}`);
        });
    });
};

const shutdown = () => {
    prisma.$disconnect().then(() => {
        server.close();
    });
};

if (require.main === module) boot();
else {
    console.info('Server running as a module');
    module.exports = { boot, shutdown, PORT };
}

