import React, { useEffect, useState } from 'react'
import profile from "../../assets/images/mobile.png";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import { FAILURE, REQUEST, SUCCESS } from '../../redux/feature/chatReducer';
import { LuSearch } from 'react-icons/lu';
import { SELECTE_USER } from '../../redux/feature/chatReducer';
import '../../Css/NoConversationFound.css'

const Contact = () => {
  const { selectedUser, chatList } = useSelector(state => state.chat)
  const [chatuser, setChatuser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user._id);
  const { isLoading } = useSelector(state => state.user);
  const { activeUser } = useSelector(state => state.socket)
  const { message } = useSelector(state => state.message)
  const fetchConversation = async () => {
    try {
      dispatch(REQUEST());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(`http://localhost:8000/api/chat/conversation/${userId}`, config);

      if (data) {
        // const New_conversation = [...chatList, data]
        dispatch(SUCCESS(data.data));

      }

    } catch (error) {
      dispatch(FAILURE());
      console.log("error in chatList", error);
    }
  }

  useEffect(() => {
    fetchConversation();
  }, [selectedUser]);

  const handleOnClick = (item) => {
    dispatch(SELECTE_USER(item));
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredUsers = chatList.filter(user => {
    return user.name?.toLowerCase().includes(searchQuery.toLowerCase());
  })


  return (
    <>
     <div className="d-flex justify-content-start align-items-center">
        <input
          type="text"
          className="form-control  position-relative py-2 px-5 shadow rounded-5"
          placeholder="Search Friends"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn fs-5 position-absolute ms-1 mb-1 border-0">
          <LuSearch />
        </button>
      </div>
      {chatList.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center my-5 conversation'>
          <h2 className='fw-bold'>No conversation Found</h2>
        </div>
      ) :(<div>
       
      <ul className="list-group my-2">
        {isLoading ? <LoadingSpinner /> : (
          filteredUsers?.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex gap-2 justify-content-between align-items-center bg-light px-3 border-0 border-bottom shadow mb-2 rounded-2"
              onClick={() => handleOnClick(item)}
              style={{ cursor: "pointer", position: "relative" }} // Add position: relative to parent
            >
              <div className='d-flex align-items-center gap-3'>
                <div style={{ position: "relative" }}> {/* Add position: relative to contain the absolute positioned badge */}
                  <img
                    src={item.profile?.profile_picture_url}
                    alt="Profile"
                    height={48}
                    width={48}
                    className="rounded-circle"
                  />
                  {activeUser.some(user => item.receiverId?.includes(user.userId)) ? (
                    <span className="position-absolute translate-middle badge border border-light rounded-circle" style={{ top: "5px", background: "lightgreen", padding: "6px" }}>
                      <span className="visually-hidden">Online</span>
                    </span>
                  ) : null}
                </div>
                <div style={{ lineHeight: "0.5" }}>
                  <p className="fs-6 fw-bold">{item.name}</p>

                  <p className="m-0">{}</p>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-between ' >
                <span>Status</span>
                <span>time</span>
              </div>
            </li>
          ))
        )}
      </ul>
      </div>)  }
    </>
  )
}

export default Contact;
