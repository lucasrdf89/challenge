import * as functions from "firebase-functions";
import express from "express";
import type {Request, Response, NextFunction} from "express";
import cors from "cors";
import {expressjwt as jwt} from "express-jwt";
import config from "../config";
import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route";
import admin from "firebase-admin";

admin.initializeApp();
export const firestore = admin.firestore();

const app = express();

app.use(express.json());
app.use(cors());

const excludedRegexRoutes: RegExp[] = [];

const isRegex = (url: string) => excludedRegexRoutes.some((regex) => regex.test(url));

const publicRoutes: Record<string, string[]> = {
  POST: ["/auth/login", "/auth/register"],
  GET: [],
};

const filterPathNoToken = (req: Request): boolean => {
  const routes = publicRoutes[req.method as keyof typeof publicRoutes] || [];
  return routes.includes(req.url) || isRegex(req.url);
};

app.use(
  jwt({
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: true,
  }).unless((req: Request) => filterPathNoToken(req))
);

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, If-None-Match"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use(
  (
    err: { status?: number; message?: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(err.status || 500).json({status: 500, msg: "Internal Server Error"});
  }
);

const routes: { path: string; handler: any }[] = [
  {path: "auth", handler: authRoute},
  {path: "task", handler: taskRoute},
];

routes.forEach(({path, handler}) => {
  app.use(`/${path}`, handler);
});

export const api = functions.https.onRequest(app);
