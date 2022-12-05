import jwt from "jsonwebtoken";
import { secret } from "../config/env";
import {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} from "express-http-response";

const verifyToken = function (req, res, next) {
  const { authorization } = req.headers;
  if (
    (authorization && authorization.split(" ")[0] === "Token") ||
    (authorization && authorization.split(" ")[0] === "Bearer")
  ) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, secret, (error, data) => {
      if (error) {
        next(new UnauthorizedResponse("Invalid Token"));
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    next(new BadRequestResponse("Token not found!"));
  }
};

const auth = {
  verifyToken,
};

export default auth;
