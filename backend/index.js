import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./socket/socket.js";
import { connectToDb } from "./db/connection1.db.js";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import messageRouter from "./routes/message.route.js";

const PORT = process.env.PORT;

// connecting to the database
connectToDb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);

// API
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// Error
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
