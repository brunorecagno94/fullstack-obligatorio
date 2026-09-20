const throwError = (errorMessage, status, details) => {
    const error = new Error(errorMessage);
    error.status = status;
    error.details = details;
    throw error;
};

export default throwError;