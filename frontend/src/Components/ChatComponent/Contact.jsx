import React, { useEffect, useState } from 'react'
import profile from "../../assets/images/mobile.png";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LoadingSpinner from '../Spinner/LoadingSpinner';
import { FAILURE, REQUEST, SUCCESS } from '../../redux/feature/chatReducer';
import { LuSearch } from 'react-icons/lu';
import { SELECTE_USER } from '../../redux/feature/chatReducer';

const Contact = () => {
  const [chatuser, setChatuser] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user._id);
  const { isLoading } = useSelector(state => state.user);
  const { selectedUser } = useSelector(state => state.chat)
  // const [isFetched, setIsFetched] = useState(false); 

  const fetchConversation = async () => {
    try {
      dispatch(REQUEST());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(`http://localhost:8000/api/chat/conversation/${userId}`, config);

      if (data && data.data) {
        dispatch(SUCCESS(data.data));
        setChatuser(data.data);
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

  const filteredUsers = chatuser.filter(user => {
    return user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
      <ul className="list-group my-2">
        {isLoading ? <LoadingSpinner /> : (
          filteredUsers.map((item, index) => (
            <li key={index} className="list-group-item d-flex  gap-2 justify-content-between align-items-center bg-light px-3 border-0 border-bottom shadow mb-2 rounded-2"
              onClick={() => handleOnClick(item)}
              style={{ cursor: "pointer" }}>
              <div className='d-flex align-items-center gap-2'>
                <img
                  src={item.profile?.profile_picture_url}
                  alt="Profile"
                  height={48}
                  width={48}
                  className="rounded-circle "
                />
                <div style={{ lineHeight: "0.5" }}>
                  <p className="fs-6 fw-bold">{item.name}</p>
                  <p className="m-0">Latest message</p>
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
    </>
  )
}

export default Contact;
