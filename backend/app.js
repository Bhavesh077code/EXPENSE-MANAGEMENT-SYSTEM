import express from "express";
import "dotenv/config"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import cors from "cors";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Correct origin (no trailing slash)
app.use(cors({
    origin: [ "http://localhost:5175", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));




app.use("/user", userRoutes);
app.use("/expense", expenseRoutes)

//Connected Db
connectDB();

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})