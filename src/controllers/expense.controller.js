import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addExpense = asyncHandler(async (req, res) => {
  const { icon, amount, category, date } = req.body;

  if (!amount || !category || !date)
    throw new ApiError(400, "All fields are required");

  const userId = req.user._id;

  const newExpense = await Expense.create({
    userId,
    icon,
    category,
    amount,
    date: new Date(date),
  });
  if (!newExpense) throw new ApiError(500, "Error while creating Expense");

  return res
    .status(201)
    .json(new ApiResponse(201, { newExpense }, "Expense created successfully"));
});

export const getExpenses = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ userId: req.user._id }).sort({
    date: -1,
  });
  if (!expense) throw new ApiError(404, "expenses not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { expense }, "Expenses found succesfully"));
});

export const deleteExpense = asyncHandler(async (req, res) => {
  await Expense.findOneAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "expens deleted successfully"));
});
