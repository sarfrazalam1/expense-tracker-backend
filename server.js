import "dotenv/config";
import { connectDB } from "./src/db/database.js";
import app from "./src/app.js";

// MongoDB connection & server start
const port = process.env.PORT || 4000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode`
      );
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process if DB connection fails
  });
