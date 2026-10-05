//  const globalErrorHandler = (err, req, res, next) => {
//   const status = err.cause?.status || 500;
//   console.error(err.stack);
//   return res.status(status).json({
//     err,
//     err_Message: err.Message || "Internal Server Error",
//     stack: err.stack,
//     issuse:err.cause?.issuse
//   });
// }

const globalErrorHandler = (err, req, res, next) => {
  const status = err.cause?.status || 500;

  console.error(err.stack);

  return res.status(status).json({
    err: err.cause?.issues || {},
    err_Message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};


export default globalErrorHandler;