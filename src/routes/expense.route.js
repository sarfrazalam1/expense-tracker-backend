import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
} from "../controllers/expense.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/add").post(verifyJWT, addExpense);
router.route("/get").get(verifyJWT, getExpenses);
router.route("/:id").delete(verifyJWT, deleteExpense);

export default router;
