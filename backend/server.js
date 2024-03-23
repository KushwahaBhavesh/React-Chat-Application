import express from 'express'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'



// middlewares
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
  origin:["http://localhost:5173"],
  methods:["GET","POST"],
  credentials:true
}))

dotenv.config();




// Database connection
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected"))
  .catch(error => res.status(500).json(error))


// routes Api
app.use('/api/auth/',authRoutes)



// api
app.get('/', (req, res) => {
  res.json({ msg: "Hello" })
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("server running")
})
