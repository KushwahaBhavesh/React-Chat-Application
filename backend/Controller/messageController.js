
import Conversation from "../Models/conversationModel.js";
import Messages from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";
import { getReceiverSocketId, io } from '../socket/socket.js'


// Socket Implementation
const getSocketRefrence = (newMsg, receiverId) => {
 
  const receiverSocket = getReceiverSocketId(receiverId)
  console.log(receiverSocket,newMsg);
  if (receiverSocket) {
    io.to(receiverSocket).emit("sendMessage", newMsg)
  }
}



// Find all users
export const fetchUserController = async (req, res) => {
  const { userId } = req.params
  try {
    const allUser = await userModel.find({}, "name profile.profile_picture_url phone");
    if (!allUser) {
      return res.status(404).json({ messag: "User NotFound" })
    }
    return res.status(200).json({ allUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });

  }
};


// create conversation 
// ==>only participents
export const CreateConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    console.log("participants", participants);
    const newConversation = new Conversation({ participants }).save();
    if (newConversation) {
      return res.status(200).json({ message: "Conversation Created" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Send messages
export const SendMessageController = async (req, res) => {
  const { conversationID, senderID, msg, receiverId } = req.body
  console.log("ReceiverID", receiverId);
  let data = []
  try {
    if (!conversationID) {
      const newConversation = await new Conversation({ participants: [senderID, receiverId] }).save();



      if (newConversation) {
        console.log("conversation created");
        const newMsg = await new Messages({
          conversationID: newConversation._id,
          senderID,
          msg
        }).save();
        if (newMsg) {

          const userProfile = await userModel.findById(senderID);
          const New_Convo_Data = {
            conversationId: newMsg?.conversationID.toString(),
            senderId: newMsg?.senderID.toString(),
            name: userProfile?.name,
            profile: {
              profile_picture_url: userProfile?.profile?.profile_picture_url
            },
            msg: newMsg.msg
          }

          getSocketRefrence(New_Convo_Data, receiverId)



          const user = await userModel.findById(receiverId)
          data.push({
            conversationId: newConversation._id,
            receiverId,
            name: user.name,
            phone: user.phone,
            profile: {
              profile_picture_url: user.profile?.profile_picture_url,
            },
          })
          return res.status(200).json({ data })

        }
      }

      return res.json({ message: "message" })
    } else {
      const newMsg = await new Messages({
        conversationID,
        senderID,
        msg
      }).save();
      if (newMsg) {
        const user = await userModel.findById(senderID);
        const New_Convo_Data = {
          conversationId: newMsg?.conversationID.toString(),
          senderId: newMsg?.senderID.toString(),
          msg: newMsg.msg,
          name: user.name,
          profile: {
            profile_picture_url: user.profile?.profile_picture_url
          }
        }
        getSocketRefrence(New_Convo_Data, receiverId)
        return res.status(200).json(newMsg)
      }
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}



// fetch message 
export const fetchMessages = async (req, res) => {
  try {
    const { conversationID } = req.body
    console.log(conversationID);
    if (!conversationID) {
      return res.status(200).json({ msg: [], message: "empty msg" })
    }

    const messages = await Messages.find({ conversationID })
    if (messages.length !== 0) {
      const msg = messages.map(item => ({
        senderID: item.senderID,
        msg: item.msg
      }))

      if (msg) {
        return res.status(200).json({ msg })
      }
    } else {
      return res.status(200).json({ msg: [] })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


// Fetching all the Conversation of the uses
// FetchConversationController

export const FetchConversationController = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({ participants: { $in: userId } });
    const receiverIdSet = new Set();
    const data = [];
    console.log(conversations);
    for (const conversation of conversations) {
      const receiverId = conversation.participants.find(participant => participant.toString() !== userId).toString()
      console.log(receiverId);
      if (!receiverIdSet.has(receiverId)) {
        const user = await userModel.findById(receiverId)
        data.push({
          conversationId: conversation._id,
          receiverId: receiverId,
          name: user.name,
          phone: user.phone,
          profile: {
            profile_picture_url: user.profile?.profile_picture_url,
          }
        });
        receiverIdSet.add(receiverId);
      }
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
