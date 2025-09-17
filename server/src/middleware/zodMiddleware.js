const {CustomError}=require("./errorMiddleware")
const validate = (scheme) => {
  return (req, res, next) => {
    try {
      scheme.parse(req.body);
      next();
    } catch (err) {
      next(new CustomError(err.issues[0].message, 400));
    }
  };
};

module.exports = { validate };