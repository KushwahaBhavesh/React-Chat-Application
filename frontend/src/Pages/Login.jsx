import React, { useState } from "react";
import "../Css/register.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { BiSolidHide } from "react-icons/bi";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../redux/feature/userReducer";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";



const Login = () => {

  const [passwordType, SetPasswordType] = useState(false);
  const dispatch = useDispatch()
  const { isLoading, user } = useSelector(state => state.user)

  const handlePasswordView = (e) => {
    e.preventDefault();
    passwordType ? SetPasswordType(false) : SetPasswordType(true);
  };
  const navigate = useNavigate()
  const emaiRef = useRef(undefined);
  const passwordRef = useRef(undefined);

  // Form Submition
  axios.defaults.withCredentials = true;
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const email = emaiRef.current.value;
    const password = passwordRef.current.value;

    if (password.length < 8) {
      toast.error("Enter Valid password");
    } else {
      try {
        dispatch(LOGIN_USER_REQUEST())
        const config = { Headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
          `http://localhost:8000/api/auth/`,
          { email, password },
          config,

        );
        console.log(data);

        if (data && data.success) {
          const {name,profile,_id} = data.user
          const user =  {name,profile,_id}
          dispatch(LOGIN_USER_SUCCESS(user))
          toast.success(data.message);
          navigate('/user/chat')
        } else {
          dispatch(LOGIN_USER_FAILURE(data.message))
          toast.error(data.message);
        }
      } catch (error) {
        dispatch(LOGIN_USER_FAILURE(error))
        toast.error(error);
      }
    }
  };

  return (
    <>
    {isLoading ? <LoadingSpinner/> :(
      <section className="container-fluid bg-warning vh-100">
        <div className="box-1"></div>
        <div className="box-2"></div>

        <div className="row row-cols-2 d-flex justify-content-center align-items-center vh-100">
          {/* Registration Page */}
          <div className="form-className col d-flex justify-content-center align-items-center border-0">
            <form
              className="form-control w-50 py-5 bg-light rounded-5"
              onSubmit={handleFormSubmit}
            >
              <div className="row g-3  d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center fw-bolder ">Login</h3>

                <div className="col-lg-10  col-md-6">
                  <input
                    type="email"
                    className="form-control p-3"
                    placeholder="abc@gmail.com "
                    ref={emaiRef}
                  />
                </div>

                <div className="col-lg-10  col-md-6 position-relative align-items-center justify-content-center d-flex">
                  <input
                    type={passwordType ? "text" : "password"}
                    className="form-control  p-3 position-relative"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
                  <button
                    className=" border-0 bg-white fs-3 p-1 position-absolute end-0 mx-3"
                    onClick={handlePasswordView}
                  >
                    {passwordType ? <IoEye /> : <BiSolidHide />}
                  </button>
                </div>

                <div className="col-lg-10  col-md-6 mb-3">
                  <button className="btn btn-primary w-100">Login</button>
                </div>
                <div className="col-lg-10 col-md-6 position-relative">
                  <span className="position-absolute bottom-0 end-0 ">
                    Forgot password ?
                  </span>
                </div>
                <div className="col-lg-10 col-md-6 text-center mt-5">
                  <span className="">Not Have Account </span>
                </div>
                <div className="col-lg-10 col-md-6 text-center">
                  <Link to="/register">
                    <button className="btn btn-primary w-100">
                      Create new Account
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Login;
