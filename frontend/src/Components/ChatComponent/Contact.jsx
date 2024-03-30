import React from 'react'
import profile from "../../assets/images/mobile.png";


const Contact = () => {
  return <>
   
    <div className="card-body text-black">
      <div className="d-flex align-items-center ">
        <div className="flex-shrink-0">
          <img
            src={profile}
            width="35"
            height="35"
            alt="Generic placeholder image"
            className="rounded-circle mt-3 "
          />
        </div>
        <div className="flex-grow-1 ms-3 d-flex justify-content-between">
          <div className="d-flex flex-column">
            <span className="fs-5 fw-bold mb-0 text-info">
              Bhavesh Kushwaha
            </span>
            <p className="m-0">Latest message</p>
          </div>
          <div className="justify-content-between align-items-center d-flex flex-column ">
            <span>time</span>
            <span>Status</span>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Contact
