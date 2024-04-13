import React, { useRef, useState } from "react";
import "../../Css/Modal.css"
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EditBio = ({setIsOpen,setUpdate }) => {

  const userID = useSelector(state => state.user.user._id)
  const bioRef = useRef();

  axios.defaults.withCredentials = true
  const handleBioSubmit = async (e) => {
    e.preventDefault();
    const bioString = bioRef.current.value;
    try {
      const config = { Headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`http://localhost:8000/api/user/bio/edit/${userID}`, {bioString} , config)

      if(data){
        toast.success(data.message)
        setIsOpen();
        setUpdate()
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="overlay">
        <div
          className="modal-container rounded-3 shadow bg-light p-5"
          style={{ width: "30em" }}
        >
          <div className="modal-body p-2 ">
            <h3 className="fw-bold mb text-center my-3">Edit Profile</h3>
            <div className="row">

              <div className="col">
                <span className="fs-5">Edit Bio</span>
                <textarea type="text" ref={bioRef} className="form-control p-2" placeholder="status" />
              </div>
            </div>
            <div className="col d-flex gap-3 justify-content-end mt-5 ">
              <button className="btn btn-danger" onClick={setIsOpen} type="button">
                Close
              </button>
              <button className="btn btn-primary" onClick={(e)=>handleBioSubmit(e)}>Save</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditBio;
