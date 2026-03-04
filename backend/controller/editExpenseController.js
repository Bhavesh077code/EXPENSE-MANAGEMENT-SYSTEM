import { Expense } from "../module/expenseModel.js";

export const editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, category, paymentMethod, description } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            {
                _id: id,
                user: req.user._id
            }, {

            $set: { title, description, category, amount, paymentMethod }

        },
            {
                new: true,
                runValidators: true,
                returnDocument: after
            }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense Not Found" });
        }

        return res.status(200).json({
            message: "Expense Updated Successfulley",
            expense: updatedExpense
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Update Expense Error"
        })
    }
}