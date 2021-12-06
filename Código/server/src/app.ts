import express from 'express';
import router from './routes';
import prisma from './db';
import cors from 'cors';
import { default as DBG } from 'debug';
import * as http from 'http';
import { basicErrorHandler, onError, onListening } from './appsupport';

export const PORT = process.env.PORT || 3000;
const app = express();
const debug = DBG('moedas:debug');
var path = require('path');
const HTML_DIR = path.join(__dirname, '/../../front');

app.use(express.static(HTML_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/', router);

app.use(basicErrorHandler);

export const server = http.createServer(app);

prisma
    .$connect()
    .then(() => {
        server.listen(PORT);
    })
    .catch(error => {
        onError({
            code: 'EMOEDAPRISMA',
            error,
        });
    });

server.on('error', onError);
server.on('listening', onListening);
server.on('request', (req, res) => {
    debug(`${new Date().toISOString()} request ${req.method} ${req.url}`);
});

app.get('/alunos', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/aluno.html'));
});

app.get('/empresas', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/empresa.html'));
});

app.get('/moedas', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/moedas.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/index.html'));
});

app.get('/extrato', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/extrato.html'));
});

app.get('/cadastrovantagem', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../front/view/cadastrovantagem.html'));
});
