
import { Expense } from "../module/expenseModel.js";
import { Notification } from "../module/notificationModel.js";
import getLimit from "./limitcontroller.js";


export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, paymentMethod, description, date } = req.body;
        const user = req.user;

        // 1️⃣ Validation
        if (!title || !amount || !category) {
            return res.status(400).json({ message: "Title, amount and category are required" });
        }

        //MONTHLY LIMIT
        if (user.monthlyLimit > 0) {

            const now = new Date();
            const start = new Date(now.getFullYear(), now.getMonth(), 1);
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            const total = await Expense.aggregate([
                {
                    $match: {
                        user: user._id,
                        createdAt: { $gte: start, $lte: end }
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$amount" }
                    }
                }
            ]);

            const spent = total[0]?.total || 0;
            const newTotal = spent + amount;

          
            if (newTotal > user.monthlyLimit) {

                await Notification.create({
                    user: user._id,
                    message: `Monthly limit exceeded! You have spent ₹${spent} out of ₹${user.monthlyLimit}`
                });

                return res.status(400).json({
                    message: "Monthly limit exceeded!",
                    spent,
                    limit: user.monthlyLimit
                });
            }

            
            if (newTotal >= user.monthlyLimit * 0.8) {
                await Notification.create({
                    user: user._id,
                    message: "⚠ You have used 80% of your monthly limit!"
                });
            }
        }


        const expense = new Expense({
            title,
            amount,
            category,
            paymentMethod: paymentMethod || "Cash",
            description,
            date: date || Date.now(),
            user: req.user._id, 
        });

        await expense.save();

        return res.status(201).json({
            message: "Expense added successfully",
            expense
        });

    } catch (error) {
        console.error("Add Expense Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
