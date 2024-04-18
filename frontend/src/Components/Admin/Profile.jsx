import React, { useEffect, useRef, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import "../../Css/Admin/utils.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from "../../redux/feature/userReducer";
import CircularLoading from "../Spinner/circularLoading";
import { FaUserEdit } from "react-icons/fa";
import EditBio from "./EditBio";
import { FiEdit } from "react-icons/fi";
import SocialMediaEdit from "./SocialMediaEdit";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const [upload, setUpload] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userID = useSelector((state) => state.user.user._id);
  const { isLoading, isError } = useSelector((state) => state.user);
  axios.defaults.withCredentials = true;
  const fetchProfile = async () => {
    try {
      dispatch(FETCH_PROFILE_REQUEST());
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(
        `http://localhost:8000/api/user/profile/${userID}`,
        config
      );
      if (data) {
        const { name, _id } = data.user;
        const profile_picture_url = data.user.profile.profile_picture_url;
        const payload = { name, _id, profile_picture_url };
        dispatch(FETCH_PROFILE_SUCCESS(payload));
        setUser(data.user);
        setUpdate(false);
      }
    } catch (error) {
      toast.error("Check your Connection");
      dispatch(FETCH_PROFILE_FAILURE());

      if (error.response.status === 404) {
        setUpdate(false);
        setTimeout(() => {
          navigate("/");
          toast.error("Relogin");
        }, 2000);
      }
      if (error.response.status === 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  const formatDate = (birthdate) => {
    return birthdate.split("-").reverse().join("-");
  };

  const handleImageClick = async () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUpload(true);
      const config = { headers: { "Content-Type": "application/form-data" } };
      const { data } = await axios.post(
        "http://localhost:8000/api/user/update/profileImage",
        formData,
        config
      );
      console.log(data);
      setUpdate(true);
      if (data) {
        const { secure_url } = data;
        const config = { Headers: { "Content-Type": "application/json" } };
        const res = await axios.post(
          `http://localhost:8000/api/user/profileImage/edit/${userID}`,
          { secure_url },
          config
        );

        if (res) {
          setTimeout(() => {
            toast.success(res.data.message);
          }, 2000);
          setUpdate(false);
          setUpload(false);
        }
        toast.success(data.message);
      }
    } catch (error) {
      setUpload(false);
      toast.error(error.message);
      console.error("Error uploading image: ", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [update]);

  const account = user?.profile?.social_media;

  return (
    <>
      <div className="bg-warning" style={{ height: "12rem" }}></div>
      <div className="bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="card ms-5 border-0 bg-light "
            style={{ marginTop: "-100px" }}
          >
            {isLoading ? (
              <CircularLoading />
            ) : (
              <img
                src={user && user.profile.profile_picture_url}
                width={150}
                height={150}
                alt={
                  user ? user.profile.profile_picture_url : " Image NotFound"
                }
                className="border border-3 rounded-3 shadow"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
            )}
            <input
              type="file"
              className="d-none"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            {isLoading ? null : (
              <button
                className="btn btn-outline-warning mt-2 shadow border-0 text-dark"
                onClick={() => setIsOpen("EditProfile-Model")}
                style={{ display: `${isError ? "none" : "block"}` }}
              >
                {upload ? "uploading..." : "Edit Profile"}
              </button>
            )}
          </div>
          <div className="d-flex gap-4 align-items-center justify-content-center d-none">
            <div className="fs-5 text-center">
              <span>223</span>
              <p>likes</p>
            </div>
            <div className="fs-5 text-center">
              <span>100</span>
              <p>Contact</p>
            </div>
            <div className="fs-5 text-center">
              <span>100</span>
              <p>Followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-3">
        <span className="d-flex align-items-center  bio-container">
          <h4>Bio</h4>
          <button
            className="btn border-0"
            onClick={() => setIsOpen("EditBio-Model")}
          >
            <FaUserEdit className="bio-edit" />
          </button>
        </span>
        <p>{user && user.profile?.bio}</p>
      </div>
      <div className="row d-flex justify-content-center align-items-center ">
        {isLoading ? (
          <CircularLoading />
        ) : (
          <div className="d-flex">
            <div className="col-9 p-2 ">
              <div className="row g-3 p-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user && user.profile.firstName
                        ? user.profile.firstName
                        : "first Name"
                    }
                    readOnly
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user && user.profile.lastName
                        ? user.profile.lastName
                        : "last Name"
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row g-3 p-3">
                <div className="col">
                  <input
                    type="email"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={user && user.email ? user.email : "email"}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col">
                  <input
                    type="tel"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={user && user.phone ? user.phone : "phone"}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="row g-3 p-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user && user.profile.gender
                        ? user.profile.gender
                        : "Gender"
                    }
                    readOnly
                  />
                </div>

                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user && user.profile.birthdate
                        ? formatDate(user.profile.birthdate)
                        : "Date of Birth"
                    }
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="col mx-3 my-2">
                <input
                  type="text"
                  className="form-control shadow-sm px-4 p-2 border-0"
                  placeholder={
                    user?.profile?.location?.address
                      ? user.profile.location.address
                      : "Address"
                  }
                  readOnly
                />
              </div>
              <div className="row g-3 p-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user?.profile?.location?.country
                        ? user.profile.location.country
                        : "Country"
                    }
                    readOnly
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user?.profile?.location?.city
                        ? user.profile.location.city
                        : "City"
                    }
                    readOnly
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control shadow-sm px-4 p-2 border-0"
                    placeholder={
                      user?.profile?.location?.zipcode
                        ? user.profile.location.zipcode
                        : "Zipcode"
                    }
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="col-3  p-3">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fs-5">Social Media</span>
                  <button
                    className="btn fs-5 border-0"
                    onClick={() => setIsOpen("SocialMediaEdit-Model")}
                  >
                    <FiEdit />
                  </button>
                </div>

                <ul className="d-flex flex-column gap-2 list-unstyled">
                  {account?.map((item,index) => (
                    <li className="p-2 shadow-sm d-flex align-itmes-center justify-content-center" key={index}>
                      <div className="row w-100">
                        <div className="col-2 d-flex align-itmes-center justify-content-center">
                          <i className={`bi bi-${item.media} fs-3`}></i>
                        </div>
                        <div className="col-10 d-flex align-itmes-center justify-content-end  "><Link to={item.URL} className="link-primary link-offset-2 link-underline link-underline-opacity-0 fs-6">{item.media}</Link></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* EditProfile */}
        {isOpen === "EditProfile-Model" && (
          <EditProfile
            setIsOpen={() => setIsOpen()}
            user={user?.profile}
            setUpdate={() => setUpdate(true)}
          />
        )}

        {/* BioEdit */}
        {isOpen === "EditBio-Model" && (
          <EditBio
            setIsOpen={() => setIsOpen()}
            setUpdate={() => setUpdate(true)}
          />
        )}

        {/* Socialmedia */}
        {isOpen === "SocialMediaEdit-Model" && (
          <SocialMediaEdit
            setIsOpen={() => setIsOpen()}
            setUpdate={() => setUpdate(true)}
            user={user?.profile}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
