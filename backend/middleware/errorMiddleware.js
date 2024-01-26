// This middleware is designed to handle 404 errors, indicating that the requested resource is not found.
const notFound = (req, res, next) => {
    // It creates a new Error object with a message containing the original URL of the request.
    const error = new Error(`Not Found - ${req.originalUrl}`);
    // Sets the HTTP status code to 404 and passes the error to the next middleware in the chain.
    res.status(404);
    next(error);

    return
};
// This middleware is meant to handle general errors that may occur during the processing of a request.
const errorHandler = (err, req, res, next) => {
    // It checks the HTTP status code set in the response. If it's 200 (OK), it assumes an internal server error and sets the status code to 500.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // It extracts the error message and stack trace from the error object.
    let message = err.message;

    

    //Finally, it sends a JSON response with the appropriate status code, error message, and, in production mode, a simplified stack trace.
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

export { notFound, errorHandler };