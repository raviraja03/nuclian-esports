// Custom Error Class
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
console.log(err);
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
    err = new CustomError("Validation Error", 400);
    err.errors = errors;
  }

  if (err.code === 11000) {
   const fields = Object.keys(err.keyPattern);
  const values = err.keyValue;

  let message;

  // Handle specific cases
  if (fields.includes("email")) {
    message = "Email already exists";
  } else if (fields.includes("username")) {
    message = "Username already exists";
  } else if (fields.includes("team.members.gameId")) {
    message = `Game ID "${values["team.members.gameId"]}" is already registered for this tournament`;
  } else if (fields.includes("tournament")) {
    message = "Tournament already exists";
  } else {
    message = `${fields.join(", ")} must be unique`;
  }

  err = new CustomError(message, 409);
  }

  if (err.name === "JsonWebTokenError") {
    err = new CustomError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new CustomError("Token expired", 401);
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      error: err,
      errors: err.errors || null,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    // Operational errors
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        // errors: err.errors || null,
      });
    }

    // Unknown errors → generic message
    console.error("❌ UNEXPECTED ERROR:", err);
    return res.status(500).json({
      success: false,
      status: "error",
      message: "Something went wrong!",
    });
  }

  // Default fallback (if NODE_ENV not set)
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    errors: err.errors || null,
  });
};

const GlobalErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorMiddleware,
  CustomError,
  GlobalErrorHandler,
};
