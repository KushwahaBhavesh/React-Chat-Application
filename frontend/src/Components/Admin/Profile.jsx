import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);

  const userID = useSelector((state) => state.user.user._id);
  axios.defaults.withCredentials = true;
  const fetchProfile = async () => {
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.get(
        `http://localhost:8000/api/user/profile/${userID}`,
        config
      );
      console.log(data);
      if (data) {
        setUser(data.user)
        setUpdate(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (birthdate) => {
    return birthdate.split('-').reverse().join('-');
  }

  useEffect(() => {
    fetchProfile();
  }, [update]);



  return (
    <>
      <div className="bg-dark" style={{ height: "12rem" }}></div>
      <div className="bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="card ms-5 border-0 bg-light "
            style={{ marginTop: "-100px" }}
          >
            <img
              src={user ? user.profile.profile_picture_url : null}
              width={150}
              height={150}
              className="border border-3 rounded-3 shadow"
            />
            <button
              className="btn btn-outline-warning mt-2 shadow border-0 text-dark"
              onClick={() => setIsOpen(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="d-flex gap-4 align-items-center justify-content-center">
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
        <h4>Bio</h4>
        <p>
          Explore thousands of high-quality dashboard images on Dribbble. Your
          resource to get inspired, discover and connect with designersJun 25,
          2020 - Dashboard Interface, Web Dashboard, Dashboard Design. See more
          ideas about dashboard design, web dashboard, dashboard interface.
        </p>
      </div>
      <div className="row">
        <div className="col-8 p-2 ">
          <div className="row g-3 p-3">
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.profile.firstName ? user.profile.firstName : "first Name"} readOnly />
            </div>
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.profile.lastName ? user.profile.lastName : "last Name"} readOnly />
            </div>
          </div>
          <div className="row g-3 p-3">
            <div className="col">
              <input type="email" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.email ? user.email : "email"} readOnly disabled />
            </div>
            <div className="col">
              <input type="tel" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.phone ? user.phone : "phone"} readOnly disabled />
            </div>
          </div>
          <div className="row g-3 p-3">
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.profile.gender ? user.profile.gender : "Gender"} readOnly />
            </div>
            
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user && user.profile.birthdate ? formatDate(user.profile.birthdate) : "Date of Birth"} required readOnly />
            </div>
          </div>


          <div className="col mx-3 my-2">
            <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user?.profile?.location?.address ? user.profile.location.address : "Address"} readOnly />
          </div>
          <div className="row g-3 p-3">
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user?.profile?.location?.country ? user.profile.location.country : "Country"} readOnly />
            </div>
            <div className="col">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user?.profile?.location?.city ? user.profile.location.city : "City"} readOnly />

            </div>
            <div className="col-3">
              <input type="text" className="form-control shadow-sm px-4 p-2 border-0" placeholder={user?.profile?.location?.zipcode ? user.profile.location.zipcode : "Zipcode"} readOnly />
            </div>
          </div>
        </div>
        <div className="col-4  p-3">
          <div className="card p-3">
            <h4>Social Media</h4>
            <ul className="d-flex flex-column gap-2 list-unstyled">
              <li className="p-2 bg-warning">demo</li>
              <li className="p-2 bg-warning">demo</li>
              <li className="p-2 bg-warning">demo</li>
            </ul>
          </div>
        </div>
      </div>
      <EditProfile isOpen={isOpen} setIsOpen={() => setIsOpen(false)} setUpdate={() => setUpdate(true)} user={user?.profile} />
    </>
  );
};

export default Profile;
