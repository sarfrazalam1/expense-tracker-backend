import { Income } from "../models/income.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addIncome = asyncHandler(async (req, res) => {
  const { icon, source, amount, date } = req.body;

  if (!source || !amount || !date)
    throw new ApiError(400, "All fields are required");

  const userId = req.user._id;

  const newIncome = await Income.create({
    userId,
    icon,
    source,
    amount,
    date: new Date(date),
  });

  if (!newIncome) throw new ApiError(500, "Income not created");

  return res
    .status(201)
    .json(new ApiResponse(201, { newIncome }, "Income Added Successfully"));
});

export const getIncomes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const income = await Income.find({ userId }).sort({
    date: -1,
  });

  if (!income) throw new ApiError(404, "Income not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { income }, "Income found Successfully"));
});

export const deleteIncome = asyncHandler(async (req, res) => {
  await Income.findOneAndDelete(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, "income deleted successfully"));
});
