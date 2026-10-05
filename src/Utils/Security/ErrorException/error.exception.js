// export const ApplicationException = ({
//   message = "error",

//   options = {
//     cause: { status: 400 },
//   },
// } = {}) => {
//   throw new Error(message, options);
// };
// export const BadRequste = (message = "Confilect", issuse = {}) => {
//   return ApplicationException({
//     message,
//     options: {
//       cause: { status: 400, issuse },
//     },
//   });
// };

// export const ConfilectException = (message = "Confilect", issuse = {}) => {
//   return ApplicationException({
//     message,
//     options: {
//       cause: { status: 409, issuse },
//     },
//   });
// };

// export const NotFoundException = (message = "Not Found", issuse = {}) => {
//   return ApplicationException({
//     message,
//     options: {
//       cause: { status: 404, ...issuse },
//     },
//   });
// };

// export const UnAuthorizedException = (
//   message = "UnAuthorized",
//   issuse = {},
// ) => {
//   return ApplicationException({
//     message,
//     options: {
//       cause: { status: 401, ...issuse },
//     },
//   });
// };

// export const ForbiddenException = (message = "Forbidden", issuse = {}) => {
//   return ApplicationException({
//     message,
//           options: {
//       cause: { status: 403, ...issuse },
//     },
//   });
// };


// ####3
export const ApplicationException = ({
  message = "Bad Request",
  issues = {},
  status = 400,
} = {}) => {
  throw new Error(message, {
    cause: {
      status,
      issues,
    },
  });
};

export const ConfilectException = (message = "Conflict", issues = {}) => {
  return ApplicationException({
    message,
    status: 409,
    issues,
  });
};

export const NotFoundException = (message = "Not Found", issues = {}) => {
  return ApplicationException({
    message,
    status: 404,
    issues,
  });
};

export const UnAuthorizedException = (
  message = "Unauthorized",
  issues = {},
) => {
  return ApplicationException({
    message,
    status: 401,
    issues,
  });
};

export const ForbiddenException = (message = "Forbidden", issues = {}) => {
  return ApplicationException({
    message,
    status: 403,
    issues,
  });
};