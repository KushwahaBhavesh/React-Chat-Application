import { response } from "express";
import Conversation from "../Models/conversationModel.js";
import groupModel from "../Models/groupModel.js"
import Messages from "../Models/messageModel.js";

export const createGroupController = async (req, res) => {
  const { GroupName, members } = req.body
  console.log(GroupName, members);

  try {
    const group = new groupModel({
      GroupName,
      members
    })
    await group.save();

    console.log(group);
    if (group) {
      return res.status(200).json({ message: "group created" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error", error: error })
  }
}


// create Conversation Controller
export const CreateConversation = async (req, res) => {
  try {
    const { participants, groupId, isGroupChat } = req.body
    const conversation = new Conversation({ participants, groupId, isGroupChat }).save()
    if (conversation) {
      return res.status(200).json({ message: "Group conversation created" });
    }

  } catch (error) {

  }
}



// send message in groups
export const sendMessageInGroup = async (req, res) => {
  const { conversationID, senderID, msg } = req.body

  const newMessages = new Messages({
    conversationID,
    senderID,
    msg
  }).save()

  if (newMessages) {
    return res.status(200).json({ message: "message created", newMessages })
  }
}


// Fetch messages in Group
export const getGroupMessages = async (req, res) => {
  try {
    const { id } = req.params
    const messages = await Messages.find({ conversationID: id })
    console.log(messages.map(item => item.msg));
    if (messages) {
      return res.status(200).json({ message: "Message found", messages })
    }
  } catch (error) {
    console.log(error);
  }
}