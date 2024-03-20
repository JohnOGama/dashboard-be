import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import auth from "./routes/auth";
import post from "./routes/post";
import website from "./routes/website";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", auth);
app.use("/api/post", post);
app.use("/api/website", website);

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("ERROR", error);
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

export default app;
