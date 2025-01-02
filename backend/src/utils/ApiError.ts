interface ApiErrorType {
  errorMessage: string;
  statusCode: number;
  errors: [];
  stack: string;
}

class ApiError extends Error {
  constructor({
    errorMessage = "Something went wrong",
    statusCode = 0,
    errors = [],
    stack = "",
  }) {
    super(errorMessage);
    this.statusCode = statusCode > 0 ? statusCode : null;
    this.errors = errors;
    stack;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  statusCode;
  errors;
  success;
  stack;
}

export { ApiError };
