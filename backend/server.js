import express from 'express'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import usersRoutes from './Routes/usersRoutes.js'




// middlewares
const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}))

dotenv.config();




// Database connection
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected"))
  .catch(error => console.log("Connection Error", error))


// routes Api
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/user',usersRoutes)



// api
app.get('/', (req, res) => {
  res.json({ msg: "Hello" })
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("server running")
})
