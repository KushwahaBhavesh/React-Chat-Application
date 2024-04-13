import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    isGroupChat: { type: Boolean, default: false },
    msg: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
