import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  GroupName: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  message: [{
    type: String,
    default: []
  }]
},{timestamps:true})


const groupModel = mongoose.model('Groups',groupSchema)
export default groupModel