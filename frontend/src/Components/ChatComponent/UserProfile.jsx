import axios from "axios";
import React, { useEffect, useState } from "react";
import Messagespinner from "../Spinner/messageSpinner";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Is_CLOSE } from "../../redux/feature/chatReducer";
import '../../Css/chat.css'

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const { selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const { activeUser } = useSelector(state => state.socket)

  useEffect(() => {
    const fetchProfile = async () => {
      if (selectedUser) {
        const { receiverId } = selectedUser;
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/user/profile/${receiverId}`
          );
          console.log(data);
          if (data && data.user) {
            setInfo([data.user]);
          }
        } catch (error) {
          console.log(error);
          setError("Error fetching profile data"); // Set error state
        }
      }
    };
    fetchProfile();
  }, [selectedUser]);

  const handleCloseBtn = () => {
    dispatch(Is_CLOSE());
  };

  console.log(info);
  return (
    <div className="card mt-3 border-0 bg-transparent">
      <div className="d-flex justify-content-between align-items-center px-3 border-bottom">
        <h4>Profile</h4>

        <button
          onClick={handleCloseBtn}
          className="btn "
        ><IoClose
            fontSize={30}
          />  </button>

      </div>
      {info.length === 0 ? (
        <Messagespinner />
      ) : (
        info.map((item, index) => (
          <div key={index} className="profile-Container">
            <div className="card-body mb-0 text-center">

              <div className="position-relative"> {/* Add position: relative to contain the absolute positioned badge */}
                <img
                  src={item.profile?.profile_picture_url}
                  alt="ProfileIMG"
                  width="180px"
                  height="180px"
                  style={{ objectFit: "cover" }}
                  className="rounded-circle"
                />
                {activeUser.includes(item._id) ? (
                  <span className="position-absolute translate-middle badge border border-light rounded-circle" style={{ left:"15rem",top:"1rem", background: "lightgreen", padding: "12px" }}>
                    <span className="visually-hidden">Online</span>
                  </span>
                ) : null}
              </div>
              <h5 className="mt-2 fs-2 lh-1">@{item.name}</h5>
              <div className="d-flex align-items-center justify-content-center fs-4 fw-bold">
                <span>{item.profile?.firstName}</span>
                <span>{item.profile?.lastName}</span>
              </div>
              <p className="text-muted">{item.profile?.bio}</p>
            </div>
            <div className="card mx-3">
              <div className="card-body row mx-2 lh-2">
                <div className="col">
                  <span className="fw-bold">Email :</span>
                  <p>{item.email}</p>
                </div>
                <div className="col">
                  <span className="fw-bold">Phone:</span>
                  <p>{item.phone}</p>
                </div>
                <div className="col-3">
                  <span className="fw-bold">Gender</span>
                  <p>{item.profile?.gender}</p>
                </div>
                <div className="col">
                  <span className="fw-bold">Birth Date</span>
                  <p>{item.profile?.birthdate}</p>
                </div>

                <div className="col-12 ">
                  <span className="fw-bold">Address</span>
                  <p>{item.profile?.location?.address}</p>
                </div>
                <div className="col">
                  <span className="fw-bold">Nationality</span>
                  <p>{item.profile?.location?.country}</p>
                </div>

                <div className="col">
                  <span className="fw-bold">City</span>
                  <p>{item.profile?.location?.city}</p>
                </div>

                <div className="col">
                  <span className="fw-bold">Zipcode</span>
                  <p>{item.profile?.birthdate}</p>
                </div>

              </div>
            </div>
            <div className="card mt-2 mx-3">
              <div className="card-body">
                <ul className="list-group list-group-flush rounded-3">
                  {item.profile?.social_media.map((media, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <i className={`bi bi-${media.media} fs-3`}></i>
                      <a href={media.URL} className="mb-0">{media.media}</a >
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default UserProfile;
