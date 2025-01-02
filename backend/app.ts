import express, { Express } from "express";
import cors from "cors";
import userRouter from "./src/routes/user.router";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app: Express = express();

app.use(
  cors({
    credentials: true,
    origin: "localhost:5173",
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(cookieParser());

// routes
app.use("/api/v1/user", userRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
