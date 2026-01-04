import express from "express";
import {
  addIncome,
  deleteIncome,
  getIncomes,
} from "../controllers/income.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/add").post(verifyJWT, addIncome);
router.route("/get").get(verifyJWT, getIncomes);
router.route("/:id").delete(verifyJWT, deleteIncome);

export default router;
