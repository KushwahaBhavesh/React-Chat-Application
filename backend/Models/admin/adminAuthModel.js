import mongoose, { Schema } from "mongoose";
const accessTokenModel = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    unique: true,
  },
  Token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

const admintoken = mongoose.model('adminToken', accessTokenModel)
export default admintoken 