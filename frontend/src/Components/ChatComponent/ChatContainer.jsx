import React, { useEffect, useState } from 'react'
import profile from "../../assets/images/mobile.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { BsEmojiGrin } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  // useEffect(async() => {
  //   await axios.get("http://localhost:8000/api/auth/protected")
  //     .then(res => setMsg(res.data.message))
  //     .catch(err => {
  //       console.log(err)
  //       // if (err.response.status === 404) {
  //       //   toast.error("unauthorized access")
  //       //   navigate('/')
  //       // }
  //     })
  // }, [])
  return<>
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
  </>
}

export default ChatContainer
