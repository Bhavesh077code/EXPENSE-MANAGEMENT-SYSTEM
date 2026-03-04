
import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import { addExpense } from "../controller/expenseController.js";
import { getExpense } from "../controller/getExpenseController.js";
import { editExpense } from "../controller/editExpenseController.js";
import { getDashboard } from "../controller/dashbordController.js";
import { getNotifications } from "../controller/setNotificationController.js";
import { setMonthlyLimit } from "../controller/monthlyLimitcontroller.js";
import { deleteExpense } from "../controller/deleteExpenseController.js";


const router= express.Router();

router.post("/create", authMiddleware, addExpense);
router.get("/get-create", authMiddleware, getExpense);
router.put("/edit/:id", authMiddleware, editExpense);
router.get("/dashboard", authMiddleware, getDashboard);
router.get("/notification", authMiddleware, getNotifications);
router.put("/set-limit", authMiddleware, setMonthlyLimit);
router.delete("/delete/:id",  deleteExpense);

export default router;