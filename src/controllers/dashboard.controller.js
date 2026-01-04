import { Types } from "mongoose";
import { Expense } from "../models/expense.model.js";
import { Income } from "../models/income.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userObjectId = new Types.ObjectId(String(userId));

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sixtyDaysAgo = new Date(now);
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const sumAmount = (Model, match) =>
    Model.aggregate([
      { $match: match },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

  const [
    totalIncome,
    totalExpense,
    incomeLast30Days,
    expenseLast30Days,
    incomeLast60Days,
    expenseLast60Days,
  ] = await Promise.all([
    sumAmount(Income, { userId: userObjectId }),
    sumAmount(Expense, { userId: userObjectId }),
    sumAmount(Income, { userId: userObjectId, date: { $gte: thirtyDaysAgo } }),
    sumAmount(Expense, { userId: userObjectId, date: { $gte: thirtyDaysAgo } }),
    sumAmount(Income, { userId: userObjectId, date: { $gte: sixtyDaysAgo } }),
    sumAmount(Expense, { userId: userObjectId, date: { $gte: sixtyDaysAgo } }),
  ]);

  const getTotal = (aggResult) => aggResult[0]?.total || 0;

  const last5Incomes = (
    await Income.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)
      .lean()
  ).map((d) => ({ ...d, type: "income" }));
  const last5Expenses = (
    await Expense.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)
      .lean()
  ).map((d) => ({ ...d, type: "expense" }));

  const last5Transactions = [...last5Incomes, ...last5Expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalIncome: getTotal(totalIncome),
        totalExpense: getTotal(totalExpense),
        incomeLast30Days: getTotal(incomeLast30Days),
        expenseLast30Days: getTotal(expenseLast30Days),
        incomeLast60Days: getTotal(incomeLast60Days),
        expenseLast60Days: getTotal(expenseLast60Days),
        last5Transactions,
      },
      "Dashboard data fetched successfully"
    )
  );
});
