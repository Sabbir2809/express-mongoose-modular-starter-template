import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import router from "./routes/router";

// express app instance
const app: Application = express();

// application middleware
app.use(cookieParser());
app.use(
  cors({
    origin: config.cors_origin || "*",
    credentials: true,
  })
);
app.use(express.json());

// application routes
app.use("/api/v1", router);

// health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "ALL IS WELL! ✅",
  });
});

// error handling
app.use(globalErrorHandler);

// catch-all route for 404 errors
app.use(notFound);

export default app;
