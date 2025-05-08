import type {JwtPayload} from "jsonwebtoken";

declare module "express" {
  export interface Request {
    auth?: JwtPayload & {id: string};
  }
}
