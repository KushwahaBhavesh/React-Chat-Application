import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "../../Css/Modal.css";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import axios from 'axios'
import MessageSpinner from '../Spinner/messageSpinner'
import { Link } from "react-router-dom";



const CreateGroup = ({ setIsOpen, allUsers, isLoading }) => {
  const [filteredUser, setFilteredUser] = useState(allUsers)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState([])
  const groupNameRef = useRef(null)
  console.log(allUsers);

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

  // Handle add and remove user
  const handleAddandRemoveBtn = (userId, username) => {
    const userIndex = selectedUser.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      setSelectedUser([...selectedUser, { id: userId, name: username }])
    } else {
      const updateUsers = [...selectedUser];
      updateUsers.splice(userIndex, 1)
      setSelectedUser(updateUsers);
    }
  }

  console.log(selectedUser);


  // Submit Btn
  const handleSubmitBtn = async () => {
    const members = selectedUser.map(item => item.id)
    const GroupName = groupNameRef.current.value
    const groupdata = { GroupName, members }
    console.log(groupdata);

    try {
      const config = { header: { "Content-Type": "application/json" } }
      const { data } = await axios.post('http://localhost:8000/api/group/create-group', groupdata, config)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="overlay">
        <div
          className="modal-container rounded-4 shadow bg-light"
          style={{ width: "30em" }}
        >
          <div className="modal-body p-4 ">
            <div className=" d-flex justify-content-between align-items-center">
              <h2 className="fw-bold mb-0">Create Groups</h2>
              <Link
              to="/user/chat/"
                className="border-0  bg-transparent fs-3 text-dark"
                onClick={setIsOpen}
              >
                <IoClose />
              </Link>
            </div>

            <ul className="d-grid gap-4 my-4 list-unstyled small">
              <li className="d-flex gap-4">
                <div className="col">
                  <h5 className="mb-0"> Group Name</h5>
                  <input
                    type="text"
                    placeholder="Group name"
                    className="form-control mt-2 px-3"
                    ref={groupNameRef}
                  />
                </div>
              </li>
              <li className="d-flex gap-4">
                <div className="col">
                  <h5 className="mb-0">Select users</h5>
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Enter Username / Phone "
                    className="form-control mt-2 px-3 mb-0"
                    onChange={handleSearch}
                  />
                </div>
              </li>
              <div className="d-flex gap-2">
                {selectedUser.map(item => <span className="d-inline bg-warning rounded-3  p-2">{item.name}</span>
                )}
              </div>


              {isLoading ? (
                <MessageSpinner />
              ) : (
                <ul className="list-group">
                  {filteredUser.map((item) => (
                    <li
                      key={item._id}
                      className={`list-group-item list-group-item-action me-5 ms-4 p-1 mb-1 border-0 rounded-5`}
                      aria-current="true"
                      style={{ cursor: "pointer", width: "90%" }}
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

                        <button className="btn btn-primary position-absolute end-0 rounded-5" onClick={() => handleAddandRemoveBtn(item._id, item.name)}> {selectedUser.some(user => user.id === item._id) ? <FaMinus /> : <FaPlus />}</button>
                      </div>

                    </li>
                  ))}
                </ul>
              )}
            </ul>
            <button
              type="button"
              className="btn btn-lg btn-primary mt-3 w-100 rounded-5 "
              data-bs-dismiss="modal"
              onClick={handleSubmitBtn}
            >
              Create Group
            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default CreateGroup;
