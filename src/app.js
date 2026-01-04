import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import incomeRouter from "./routes/income.route.js";
import expenseRouter from "./routes/expense.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import { errorHandler } from "./middlewares/error.middileware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Health check endpoint
app.get("/", (req, res) => {
  res.send("✅ API is working fine.");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/incomes", incomeRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(errorHandler);

export default app;
