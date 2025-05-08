import type {Request, Response, NextFunction} from "express";

/**
 * Middleware to validate request body, query, and params against a given schema.
 *
 * @param {Object} schema - The validation schema.
 * @param {Object} [schema.body] - Joi schema for validating the request body.
 * @param {Object} [schema.query] - Joi schema for validating the request query.
 * @param {Object} [schema.params] - Joi schema for validating the request params.
 * @return {Function} Middleware function to validate the request.
 */
const validate = (schema: {
  body?: { validate: (data: unknown) => { error?: Error } },
  query?: { validate: (data: unknown) => { error?: Error } },
  params?: { validate: (data: unknown) => { error?: Error } }
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        const {error} = schema.body.validate(req.body);
        if (error) {
          res.status(400).json({code: 400, msg: error.message});
          return;
        }
      }
      if (schema.query) {
        const {error} = schema.query.validate(req.query);
        if (error) {
          res.status(400).json({code: 400, msg: error.message});
          return;
        }
      }
      if (schema.params) {
        const {error} = schema.params.validate(req.params);
        if (error) {
          res.status(400).json({code: 400, msg: error.message});
          return;
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;
