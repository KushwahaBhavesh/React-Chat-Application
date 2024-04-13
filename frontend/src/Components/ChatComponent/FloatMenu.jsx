import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateGroup from "../modal/CreateGroup";
import CreateConversation from "../modal/CreateConversation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  FETCH_ALL_USER_FAILURE,
  FETCH_ALL_USER_REQUEST,
  FETCH_ALL_USER_SUCCESS,
} from "../../redux/feature/userReducer";
import { Link } from "react-router-dom";

const FloatMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  
  const fetchAllUser = async () => {
    try {
      dispatch(FETCH_ALL_USER_REQUEST());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(
        `http://localhost:8000/api/chat/search/user`,
        config
      );
      console.log(data);
      if (data) {
        const { allUser } = data;
        dispatch(FETCH_ALL_USER_SUCCESS());
        setAllUsers(allUser);
      }
    } catch (error) {
      dispatch(FETCH_ALL_USER_FAILURE());
      console.log("Error in userfoud", error);
    }
  };

  useEffect(() => {
    if (allUsers.length === 0) {
      fetchAllUser();
    }
    setIsOpen(!isOpen);
  }, [])

  return (
    <>
      <div className="position-fixed dropup" style={{ zIndex: "999" }}>
        <button
          className="btn btn-dark d-flex justify-content-center align-items-center p-3 rounded-circle position-fixed"
          style={{ bottom: "10%", left: "19%" }}
          data-bs-toggle="dropdown"
          aria-expanded="false"

        >
          <FaPlus />
        </button>
        <ul className="dropdown-menu mb-2 shadow">
          <li>
            <Link
              to="/user/chat/new-chat"
              className="dropdown-item"
              onClick={() => setIsOpen("create-conversation")}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
            to="/user/chat/create-group"
              className="dropdown-item  "
              onClick={() => setIsOpen("create-Group")}
            >
              Create Group
            </Link>
          </li>
        </ul>
      </div>

      {isOpen === "create-Group" && (
        <CreateGroup setIsOpen={() => setIsOpen()} allUsers={allUsers} isLoading={isLoading} />
      )}
      {isOpen === "create-conversation" && (
        <CreateConversation setIsOpen={() => setIsOpen()} allUsers={allUsers} isLoading={isLoading} />
      )}
    </>
  );
};

export default FloatMenu;
