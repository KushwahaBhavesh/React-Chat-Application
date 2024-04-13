import mongoose, { Schema } from "mongoose";

const authVerifyToken = new mongoose.Schema({
  userId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'users',
    unique:true,
  },
  token:{
    type:String,
    required:true
  }
},{timestamps:true})

const tokensModel = mongoose.model('verifyToken',authVerifyToken)
export default tokensModel