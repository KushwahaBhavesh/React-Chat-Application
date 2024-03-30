import React, { useState } from "react";
import "../../Css/Modal.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast'

import { UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../../redux/feature/userReducer";

const EditProfile = ({ isOpen, setIsOpen, setUpdate, user }) => {
  if (!isOpen) return null;
  const userID = useSelector(state => state.user.user._id)
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(user)
  const [checked, setChecked] = useState(null);

  formData.gender = checked;
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === 'address' || name === 'city' || name === 'country' || name === 'zipcode') {
      setFormData(prevState => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }



  axios.defaults.withCredentials = true
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("formData::::", formData);
    try {
      dispatch(UPDATE_USER_REQUEST())
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`http://localhost:8000/api/user/profile/edit/${userID}`, formData, config)
      // console.log(data);
      dispatch(UPDATE_USER_SUCCESS())
      if (data) {
        toast.success(data.message);
        setUpdate()
        setIsOpen();
      } {
        dispatch(UPDATE_USER_FAILURE(data.message))
      }
    } catch (error) {
      console.log(error);
      dispatch(UPDATE_USER_FAILURE(error))
    }
  }

  return (
    <>
      <div className="overlay">
        <div
          className="modal-container rounded-3 shadow bg-light"
          style={{ width: "30em" }}
        >
          <div className="modal-body p-2 ">
            <h3 className="fw-bold mb text-center my-3">Edit Profile</h3>
            <form className="m-3" onSubmit={handleFormSubmit}>
              <div className="row g-2 p-2 ">
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-3 p-2 border"
                    placeholder="First name"
                    name='firstName'
                    onChange={handlechange}
                    value={formData.firstName}
                  // ref={firstNameRef}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control shadow-sm px-3 p-2 border"
                    placeholder="Last name"
                    name='lastName'
                    value={formData.lastName}
                    onChange={handlechange}
                  // ref={lastNameRef}
                  />
                </div>
              </div>
              <div className="row g-2 p-2">
                <div className="col d-flex gap-2 justify-content-center align-items-center">
                  <input
                    type="radio"
                    className="form-check-input shadow-sm  p-2 border"
                    name="flexRadioDefault"
                    value="male"
                    placeholder="Gender"
                    checked={checked === 'male'}
                    onChange={(event) => {
                      setChecked(event.target.value)
                    }}

                  />
                  Male
                  <input
                    type="radio"
                    className="form-check-input shadow-sm  p-2 border"
                    name="flexRadioDefault"
                    value="female"
                    placeholder="Gender"
                    checked={checked === 'female'}
                    onChange={(event) => {
                      setChecked(event.target.value)
                    }}

                  />
                  Female
                </div>
                <div className="col">
                  <input
                    type="date"
                    name='DOB'
                    className="form-control shadow-sm px-3 p-2 border"
                    placeholder="DOB"
                    value={formData.DOB}
                    onChange={handlechange}
                  // ref={DOBRef}
                  />
                </div>
              </div>
              <div className="col p-1 my-2">
                <textarea
                  type="text"
                  name='address'
                  className="form-control shadow-sm px-3 p-2 border"
                  placeholder="Address"
                  value={formData.location?.address ? formData.location.address : null}
                  onChange={handlechange}
                // ref={addressRef}
                ></textarea>
              </div>
              <div className="row g-2 ">
                <div className="col">
                  <input
                    type="text"
                    name='country'
                    className="form-control shadow-sm px-3 p-2 border"
                    placeholder="Country"
                    onChange={handlechange}
                    value={formData.location?.country ? formData.location.country : null}
                  // ref={countryRef}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="city"
                    className="form-control shadow-sm px-3 p-2 border"
                    placeholder="City"
                    value={formData.location?.city ? formData.location.city : null}
                    onChange={handlechange}
                  // ref={cityRef}
                  />
                </div>
                <div className="col-3">
                  <input
                    type="tel"
                    name="zipcode"
                    className="form-control shadow-sm ps-2 p-2 border"
                    placeholder="Zipcode"
                    value={formData.location?.zipcode ? formData.location.zipcode : null}
                    onChange={handlechange}
                  // ref={zipcodeRef}
                  />
                </div>
              </div>
              <div className="col d-flex gap-3 justify-content-end mt-5 ">
                <button className="btn btn-danger" onClick={setIsOpen}>
                  Close
                </button>
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default EditProfile
