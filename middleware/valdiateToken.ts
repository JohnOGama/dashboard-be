import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

const validateToken: RequestHandler = async (req: any, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "12345",
        (err, decoded: any) => {
          if (err) {
            res.status(401);
            throw new Error("User is not authorized");
          }

          req.user = decoded.user;
          next();
        }
      );
      if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing");
      }
    }
  } catch (error) {}
};

export default validateToken;
