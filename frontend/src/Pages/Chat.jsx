import UserMenu from "../Components/ChatComponent/UserMenu";

import Contact from "../Components/ChatComponent/Contact";
import FloatMenu from "../Components/ChatComponent/FloatMenu";
import ChatContainer from "../Components/ChatComponent/ChatContainer";
import UserProfile from "../Components/ChatComponent/UserProfile";

import { useSelector } from "react-redux";
import { useState } from "react";


const Chat = () => {
  const {isopen}=useSelector(state => state.chat)
  const { user } = useSelector((state) => state.user);
  const { selectedUser } = useSelector(state => state.chat)



  return (
    <>
      <section className="container-fluid vh-100" style={{ background: "#fff" }}>
        <div className="row vh-100">
          {/* First column */}
          <div className="col-3 bg-light">
            {/* Profile Avtar */}
            <UserMenu user={user} />


            {/* contact-list */}
            <div className="card bg-transparent border-0 mb-1">
              <Contact />
            </div>
            {/* float button  */}
            <FloatMenu />
          </div>

          {/* Second column */}
          <div className="col">
            <ChatContainer />
          </div>

          {/* third column */}
          {isopen ? <div className={`col-3 bg-light ${!selectedUser ? "d-none" : ""}`}>
            <UserProfile />
          </div>
            : null}
        </div>
      </section>
    </>
  );
};

export default Chat;
