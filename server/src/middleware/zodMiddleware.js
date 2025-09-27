import {CustomError} from "./errorMiddleware.js";

export const validate = (scheme) => {
  return (req, res, next) => {
    try {
      scheme.parse(req.body);
      next();
    } catch (err) {
      next(new CustomError(err.issues[0].message, 400));
    }
  };
};

