import express from 'express'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './Routes/authRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import usersRoutes from './Routes/usersRoutes.js'
import groupRoutes from './Routes/groupRoutes.js'
import adminRoutes from './Routes/Admin/adminRoutes.js'
import { app, server } from './socket/socket.js';




// middlewares
// const app = express();

app.use(cookieParser());
app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
}))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
//     return res.status(200).json({})
//   }
//   next();
// })

dotenv.config();




// Database connection
mongoose.connect(process.env.URI)
  .then(() => console.log("Connected"))
  .catch(error => console.log("Connection Error", error))


// routes Api
app.use('/api/auth', authRoutes)
app.use('/api/chat', messageRoutes)
app.use('/api/user', usersRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/admin/', adminRoutes)



// api
app.get('/', (req, res) => {
  res.json({ msg: "Hello" })
})


const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log("server running")
})
