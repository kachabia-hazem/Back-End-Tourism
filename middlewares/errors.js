module.exports.errorHandler = (err, req, res, next) => {
    // Log the error stack trace for debugging purposes
    console.error(err.stack);
  
    // Extract the status and message from the error, or set default values
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
  
    // Send a JSON response with the error status and message
    res.status(status).json({
      success: false,
      status,
      message,
    });
  };
  