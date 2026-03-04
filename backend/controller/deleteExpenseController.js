
import { Expense } from "../module/expenseModel.js";

export const deleteExpense = async (req , res) => {
    try {
        const { id } = req.params;

        const expense  = await Expense.findByIdAndDelete(id);
        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            })
        };
     
        return res.status(200).json({
            message: "Success Delete"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Delete message"
        })
    }
}