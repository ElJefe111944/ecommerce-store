// This middleware is designed to handle asynchronous functions 
// in Express route handlers by wrapping them in a Promise and using .catch(next)
// to forward any errors to the Express error handling middleware.


// function takes a single argument fn, which is expected to be an asynchronous function.
// it returns a new function that takes req, res, and next as arguments.
const asyncHandler = fn => (req, res, next) => {
    // The asynchronous function fn is called with the provided arguments (req, res, next) 
    // within Promise.resolve() to ensure that fn always returns a Promise.

    // The .catch(next) is used to catch any errors that occur during the 
    // execution of the asynchronous function. 
    // If an error occurs, it is passed to the Express next function, 
    // which triggers the error-handling middleware.
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;