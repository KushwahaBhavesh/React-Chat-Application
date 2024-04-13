import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import MessageSpinner from "../Spinner/messageSpinner";
import { useDispatch } from "react-redux";
import { SELECTE_USER } from "../../redux/feature/chatReducer";
import { Link } from "react-router-dom";


const CreateConversation = ({ setIsOpen, allUsers, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUser, setFilteredUser] = useState(allUsers);
  const [active, setActive] = useState();
  const dispatch = useDispatch();



  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredUser(allUsers);
    }
    const filteredUser = allUsers.filter((users) =>
      users.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUser(filteredUser);
  };

  const handleOnClick = (item) => {
    dispatch(SELECTE_USER(item))
    setActive(item)
    setIsOpen()

  }
  return (
    <>
      <div className="overlay">
        <div
          className="modal-container rounded-3 shadow bg-white"
          style={{ width: "25em" }}
        >
          <div className="modal-body p-4 ">
            <div className=" d-flex justify-content-between align-items-center">
              <h4 className="fw-bold mb-0 text-center">New Chat</h4>
              <Link
                to="/user/chat/"
                className="border-0 bg-transparent fs-3 text-dark"
                onClick={setIsOpen}
              >
                <IoClose />
              </Link>
            </div>
            <div className="row my-3 mx-4">
              <input
                className="form-control p-2 px-3"
                type="input"
                value={searchQuery}
                placeholder="Username"
                onChange={handleSearch}
              />
            </div>
            {isLoading ? (
              <MessageSpinner />
            ) : (
              <ul className="list-group">
                {filteredUser.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleOnClick(item)}
                    className={`list-group-item list-group-item-action w-75 me-5 ms-4 p-1 mb-1 border-0 rounded-5  ${active?._id === item._id ? 'active' : ""}`}
                    aria-current="true"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex justify align-items-center gap-2 ">
                      <img
                        src={item.profile?.profile_picture_url}
                        alt=""
                        width={45}
                        height={45}
                        className="rounded-circle border-0"
                      />
                      <p className="fs-5 mb-0 fw-bold">{item.name}</p>
                    </div>

                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateConversation;
