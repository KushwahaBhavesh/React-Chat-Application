import React, { useEffect, useState } from "react";
import profile from "../assets/images/mobile.png";
import { FaChevronDown } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsEmojiGrin } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'

const Chat = () => {
  const navigate = useNavigate()

  const [msg, setMsg] = useState('')
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:8000/api/auth/protected")
      .then(res => setMsg(res.data.message))
      .catch(err => {
        console.log(err)
        if (err.response.status === 404) {
          toast.error("unauthorized access")
          navigate('/')
        }
      })
  }, [])
  return (
    <>
      <section className="container-fluid  vh-100">
        <div className="row h-100 gap-3 p-3">
          {/* First column */}
          <div className="col bg-light rounded-4">
            {/* Profile Avtar */}
            <div className="card bg-transparent border-0  my-3">
              <div className="card-body p-4 text-black">
                <div className="d-flex align-items-center ">
                  <div className="flex-shrink-0">
                    <img
                      src={profile}
                      width="45"
                      height="45"
                      alt="Generic placeholder image"
                      className="rounded-circle  mt-3 "
                    />
                  </div>
                  <div className="flex-grow-1 ms-3 d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="fs-4 fw-bold mb-0 text-info">
                        Bhavesh Kushwaha
                      </span>
                      <p className="m-0">online</p>
                    </div>
                    <div className="dropdown justify-content-center align-items-center d-flex ">
                      <button className="border-0 bg-transparent" data-bs-toggle="dropdown">
                        <FaChevronDown />
                      </button>
                      <ul className="dropdown-menu shadow">
                        <li><Link className="dropdown-item" to="#">Dashboard</Link></li>
                        <li><Link className="dropdown-item" to="/">Logout</Link></li>

                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Search box */}
            <div className="card-body border-0 my-4">
              <div className="d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  className="form-control  position-relative py-2 px-5 shadow rounded-5"
                  placeholder="Search Friends"
                />
                <button className="btn fs-5 position-absolute ms-1 mb-1 border-0">
                  <LuSearch />
                </button>
              </div>
            </div>

            {/* contact-list */}
            <div className="card bg-transparent border-0 mb-1">
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
            </div>
            {/* float button  */}

            <div className="position-fixed dropup" style={{zIndex:"999"}}>
              <button className="btn btn-dark d-flex justify-content-center align-items-center p-3 rounded-circle position-fixed"
                style={{ bottom: "10%", left: "19%" }}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ><FaPlus /></button>

              <ul class="dropdown-menu mb-2 shadow">
                <li><Link className="dropdown-item" to="#">Create Group</Link></li>
              </ul>
            </div>
          </div>

          {/* Second column */}
          <div className="col-6  rounded-4">
            <div className="card bg-transparent border-0">
              <div className="card-body px-4  text-black">
                <div className="d-flex align-items-center ">
                  <div className="flex-shrink-0">
                    <img
                      src={profile}
                      width="45"
                      height="45"
                      alt="Generic placeholder image"
                      className="rounded-circle  mt-3 start-0 "
                    />
                  </div>
                  <div className="flex-grow-1 ms-3 d-flex justify-content-between">
                    <div className="d-flex flex-column">
                      <span className="fs-4 fw-bold mb-0 text-primary">
                        Bhavesh Kushwaha
                      </span>
                      <p className="m-0">online</p>
                    </div>
                    <div className="justify-content-center align-items-center d-flex fs-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border-0" style={{ height: "88%" }}>
              <div className="card-body border">
{msg}
              </div>
              <div
                className="d-flex align-items-center my-4"
                style={{ height: "5%" }}
              >
                <div className="fs-4 gap-3 d-flex align-items-center">

                  <div className="dropup fs-4 d-flex align-items-center ms-3">
                    <button className="border-0 bg-transparent fs-4 d-flex align-items-center" data-bs-toggle="dropdown">
                      <FaPlus />
                    </button>
                    <ul className="dropdown-menu shadow">
                      <li>a</li>
                      <li>a</li>
                      <li>a</li>
                      <li>a</li>
                    </ul>
                  </div>
                  <button className="btn border-0  fs-4 d-flex align-items-center">
                    <BsEmojiGrin />
                  </button>
                </div>

                <div className=" d-flex align-items-center justify-content-end me-5 w-100 ">
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control position-relative px-4 shadow bg-body-tertiary rounded-5"
                    style={{
                      maxWidth: "32em",
                      width: "100%",
                      padding: "8px",
                      fontSize: "1.2rem",
                    }}
                  />
                  <button className="btn border-0  position-absolute  fs-4 d-flex align-items-center">
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* third column */}
          <div className="col-3 bg-light rounded-4">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
