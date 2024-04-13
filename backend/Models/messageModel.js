import mongoose, { Mongoose } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
