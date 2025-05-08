import type {NextFunction, Response} from "express";
import {verify, type JwtPayload} from "jsonwebtoken";
import type {IncomingMessage} from "http";
import appConfig from "../../config";

/**
 * Interface representing an authenticated request.
 * Extends the IncomingMessage interface to include a user property.
 */
export interface AuthenticatedRequest extends IncomingMessage {
  user?: JwtPayload | string;
}

/**
 * Middleware to authorize requests by verifying JWT tokens.
 *
 * @return {Function} Middleware function to authorize requests.
 */
const authorize = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      res.statusCode = 401;
      res.end(
        JSON.stringify({
          status: 401,
          msg: "Unauthorized",
        }),
      );
      return;
    }
    const decoded: string | JwtPayload = verify(token, appConfig.JWT_SECRET);
    req.user = decoded;
    next();
  };
};

export default authorize;
