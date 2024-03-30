import mongoose, { Mongoose } from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  receiverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  msg:{
    type: String,
    required: true
  }
}, { timestamps: true })

const Messages = mongoose.model('Messages',messageSchema)
export default Messages
