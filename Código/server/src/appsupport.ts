import prisma from './db';
import { server, PORT } from './app';
import { default as DBG } from 'debug';
import * as util from 'util';
import { ErrorRequestHandler, RequestHandler } from 'express';

const debug = DBG('moedas:debug');
const dbgerror = DBG('moedas:error');

/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val: string) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

type Error = {
    syscall?: string;
    code: string;
    error: Error;
};
export const onError = (error: Error) => {
    dbgerror(error);
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case 'EMOEDAPRISMA':
            console.error(`Prisma store initialization failure because `, error.error);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
export const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    debug(`Listening on ${bind}`);
};

export const handle404: RequestHandler = (req, res, next) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
};

export const basicErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Defer to built-in error handler if headersSent
    // See: http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
        console.log(`basicErrorHandler HEADERS SENT error ${util.inspect(err)}`);
        return next(err);
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    dbgerror(`basicErrorHandler ${err.status || 500} ${util.inspect(res.locals)} ${util.inspect(err)}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

async function catchProcessDeath() {
    debug('urk...');
    await prisma.$disconnect();
    await server.close();
    process.exit(0);
}

process.on('SIGTERM', catchProcessDeath);
process.on('SIGINT', catchProcessDeath);
process.on('SIGHUP', catchProcessDeath);

process.on('uncaughtException', function (err) {
    console.error(`I've crashed!!! - ${err.stack || err}`);
});
process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)}\nreason: ${reason}`);
});
