import React, { useEffect } from 'react'

const UserProfile = () => {
  
  return <>
    <div className="card mt-4 border-0 bg-transparent">
      <div className="card-body mb-0 text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
          className="rounded-circle img-fluid" style={{ width: "120px" }} />
        <h5 className="mt-2">Bhavesh</h5>
        <p className="text-muted mb-1">Profile</p>
        <p className="text-muted ">bio</p>
      </div>
    </div>
    <div className="card mx-3">
      <div className="card-body d-flex flex-column ms-4  ">
        <div className="details">
          <span>Phone :</span>
          <p> 7043110416</p>
        </div>
        <div className="details">
          <span>Description :</span>
          <p>hello every one</p>
        </div>
        <div className="details">
          <span>Email :</span>
          <p> bhavesh@gmail.com</p>
        </div>
      </div>
    </div>
    <div className="card  mt-2 mx-3">
      <div className="card-body">

        <ul className="list-group list-group-flush rounded-3">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <i className="fas fa-globe fa-lg text-warning"></i>
            <p className="mb-0">https://mdbootstrap.com</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <i className="fab fa-github fa-lg" ></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <i className="fab fa-twitter fa-lg" ></i>
            <p className="mb-0">@mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <i className="fab fa-instagram fa-lg" ></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <i className="fab fa-facebook-f fa-lg" ></i>
            <p className="mb-0">mdbootstrap</p>
          </li>
        </ul>

      </div>
    </div>
  </>
}

export default UserProfile
