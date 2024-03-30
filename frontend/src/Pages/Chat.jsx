import UserMenu from "../Components/ChatComponent/UserMenu";
import SearchInputBox from "../Components/ChatComponent/SearchInputBox";
import Contact from "../Components/ChatComponent/Contact";
import FloatMenu from "../Components/ChatComponent/FloatMenu";
import ChatContainer from "../Components/ChatComponent/ChatContainer";
import UserProfile from "../Components/ChatComponent/UserProfile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  
  return (
    <>
      <section className="container-fluid  vh-100">
        <div className="row h-100 gap-3 p-3">
          {/* First column */}
          <div className="col bg-light rounded-4">
            {/* Profile Avtar */}
            <UserMenu  />

            {/* Search box */}
            <div className="card-body border-0 my-2">
              <SearchInputBox />
            </div>

            {/* contact-list */}
            <div className="card bg-transparent border-0 mb-1">
              <Contact />
            </div>
            {/* float button  */}
            <FloatMenu />
          </div>

          {/* Second column */}
          <div className="col-6  rounded-4">
            <ChatContainer />
          </div>

          {/* third column */}
          <div className="col-3 bg-light rounded-4">
            <UserProfile />
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
