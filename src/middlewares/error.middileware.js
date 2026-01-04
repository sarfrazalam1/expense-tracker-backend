export const errorHandler = (err, _, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(status).json({
    statusCode: status,
    success: false,
    message,
    error: err.errors || [],
  });
};
