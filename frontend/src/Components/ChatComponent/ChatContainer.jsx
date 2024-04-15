import React, { useEffect, useRef, useState } from "react";
import "../../Css/chat.css";
import { BsEmojiGrin } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import NoConversationFound from "./NoConversationFound";
import axios from "axios";
import { Is_OPEN, SELECTE_USER } from "../../redux/feature/chatReducer";


const ChatContainer = () => {
  const { selectedUser, chatList } = useSelector((state) => state.chat);
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const { activeUser, socket } = useSelector((state) => state.socket);
  const chatContainerRef = useRef(null);
  const [chatContainerHeight, setChatContainerHeight] = useState(0);




  // handle input change 
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };



  // sending message to server
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
     
      const config = { headers: { "Content-Type": "application/json" } };

      let msgBody = {};
      if (selectedUser.conversationId) {
        msgBody = {
          conversationID: selectedUser.conversationId,
          senderID: userId,
          msg: newMessage,
          receiverId: selectedUser.receiverId
        };
      } else {
        // creating new conversation
        msgBody = {
          senderID: userId,
          receiverId: selectedUser._id,
          msg: newMessage,
        };
      }

      const { data } = await axios.post(
        "http://localhost:8000/api/chat/message/send",
        msgBody,
        config
      );
      console.log(data);
      if (data) {
        if (data.data) {
          data.data.map((item) => dispatch(SELECTE_USER(item)));
        }
        // Update the message state with the newly sent message
        setMessage((prev_msg) => [...prev_msg, { senderID: userId, msg: newMessage }]);
        setNewMessage("");
      }

    } catch (error) {
      console.log(error);
    }
  };


  // Socket Realtime message :::==> socket.on
  useEffect(() => {
    socket?.on("sendMessage", data => {
      console.log("received data==>", data);
      // dispatch(SUCCESS())
      setMessage((prev_Msg) => [...prev_Msg, { senderID: data.senderID, msg: data.msg }])
    })
  }, [socket])

  const handleEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage(newMessage + emoji);
  };

 

  // Fetch message from backend
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser && selectedUser.conversationId) {
        const { conversationId } = selectedUser;
        try {
         
          const config = { Headers: { "Content-Type": "application/json" } };
          const { data } = await axios.post(
            `http://localhost:8000/api/chat/message/fetch`,
            { conversationID: conversationId },
            config
          );
          if (data && data.msg) {
            setMessage(data.msg);
           
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
          
        }
      } else {
        setMessage([]);
      }
    };
    fetchMessages();
  }, [selectedUser]);



  // Profile Open
  const handleProfileOpen = () => {
    dispatch(Is_OPEN());
  };




// Update chat container height whenever it's rendered
useEffect(() => {
  if (chatContainerRef.current) {
    setChatContainerHeight(chatContainerRef.current.scrollHeight);
  }
}, [message]);


  // Scroll to bottom of chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerHeight;
    }
  }, [message, chatContainerHeight]);



  return (
    <>
      {selectedUser ? (
        <div className="card h-100 border-0 rounded-0">
          <div className="card-body border-0">
            <div className="d-flex justify-content-start align-items-center bg-light rounded-5 mx-lg- 5 p-1 gap-2 px-3 shadow-sm border">
              <img
                src={selectedUser?.profile?.profile_picture_url}
                alt="Profile"
                height={45}
                width={45}
                className="rounded-circle"
                onClick={handleProfileOpen}
                style={{ cursor: "pointer" }}
              />
              <div
                className="d-flex flex-column justify-content- align-items-start"
                style={{ lineHeight: "3px" }}
              >
                <p
                  className="fs-4 fw-bold"
                  onClick={handleProfileOpen}
                  style={{ cursor: "pointer" }}
                >
                  {selectedUser?.name}
                </p>

                {activeUser.includes(selectedUser.receiverId) ? (
                  <span
                    className="m-0 fw-semibold"
                    style={{ color: "#66f", fontSize: "12px" }}
                  >
                    online
                  </span>
                ) : null}
              </div>
            </div>

            <div className="my-2 p-2 chat-container"  ref={chatContainerRef}>
              {selectedUser._id !== chatList.receiverId ? (
                <div className="d-flex justify-content-center align-items-center h-100 message">
                  <h1>Welcome New User</h1>
                </div>
              ) :  message && message.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center h-100 message">
                  <h1>No Message Found</h1>
                </div>
              ) : (
                <div className="mx-1">
                  {message.map((item, index) => (
                    <div className="d-flex" key={index}>
                      <div
                        className={`${item.senderID === userId ? "sender" : "receiver"
                          } shadow-sm `}
                      >
                        <span className="msg">{item.msg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card-body p-0 bg-light mt-2 mx-5 rounded-pill border d-flex align-items-center shadow">
              <div className="d-flex ms-4 gap-2">
                <button className="p-2 btn border-0">
                  <FaPlus className="fs-3" />
                </button>
                
                  <div className="dropup">
                    <button
                      type="button"
                      className="btn fs-3 border-0 d-flex justify-content-center align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      <BsEmojiGrin />
                    </button>
                    <ul className="dropdown-menu">
                      <EmojiPicker
                        width="350px"
                        height="350px"
                        onEmojiClick={handleEmojiClick}
                      />
                    </ul>
                  </div>

              </div>
              <input
                type="text"
                className="form-control mx-2 p-2 border-0 bg-light fs-5"
                placeholder="Type here"
                value={newMessage}
                onChange={handleInputChange}
              />
              <button className="btn border-0 me-4" onClick={handleSendMessage}>
                <IoSend className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NoConversationFound />
      )}
    </>
  );
};

export default ChatContainer;
