import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"

dotenv.config({});
connectDB();
const app = express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



app.use("/api/v1/user",userRoute);
app.use("/api/v1/companyRoute",companyRoute)
app.use("/api/v1/job",jobRoute)
 




app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});