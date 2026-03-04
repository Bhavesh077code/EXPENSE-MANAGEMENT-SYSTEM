import { Expense } from "../module/expenseModel.js";


export const getDashboard = async (req, res) => {
    try {
        const user = req.user;  // Auth middleware se milega

        // Total spent in all time
        const totalExpenses = await Expense.aggregate([
            { $match: { user: user._id } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalSpent = totalExpenses[0]?.total || 0;

        // Monthly remaining
        const remaining = user.monthlyLimit > 0
            ? user.monthlyLimit - totalSpent
            : "Unlimited";

        res.status(200).json({
            totalSpent,
            monthlyLimit: user.monthlyLimit,
            remaining
        });

    } catch (error) {
        res.status(500).json({ message: error.message || "Dashboard Error" });
    }
};