import { ErrorRequestHandler } from "express";
import util from 'util';


export const basicErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Defer to built-in error handler if headersSent
    // See: http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
        console.log(`basicErrorHandler HEADERS SENT error ${util.inspect(err)}`);
        return next(err)
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error '+err);
}
