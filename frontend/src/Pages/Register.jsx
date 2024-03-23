import React, { useRef, useState } from "react";
import "../Css/register.css";
import { Link } from "react-router-dom";
import { BiSolidHide } from "react-icons/bi";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  // show Password button
  const [passwordType, SetPasswordType] = useState(false);
  const [cPassowrd, SetCPassword] = useState(false);

  const handlePasswordView = (e) => {
    e.preventDefault();
    passwordType ? SetPasswordType(false) : SetPasswordType(true);
  };

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    cPassowrd ? SetCPassword(false) : SetCPassword(true);
  };

  // Password Validation
  const nameRef = useRef(undefined);
  const phoneRef = useRef(undefined);
  const emailRef = useRef(undefined);
  const passwordRef = useRef(undefined);
  const confirmPasswordRef = useRef(undefined);

  // getting Ref Value
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const userData = { name, phone, email, password, confirmPassword };
    console.log(userData);

    // Form Validation
    if (phone.length !== 10) {
      toast.error("Enter valid Phone Number");
    } else if (password.length < 8) {
      toast.error("Enter valid Password");
    } else if (confirmPassword.length < 8) {
      toast.error("Enter valid confirm passowrd");
    } else if (password !== confirmPassword) {
      toast.error("confirm password not matched");
    } else {

      // toast.success("user Register Successfully");
      try {
        const config = { Headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`http://localhost:8000/api/auth/register`, userData, config);

        console.log(data);
        if (data && data.success) {
          toast.success(data.message)
        }
        else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <>
      <section className="container-fluid vh-100 bg-primary">
        <div className="box-1"></div>
        <div className="box-2"></div>

        <div className="row row-cols-2 d-flex justify-content-center align-items-center  vh-100">
          {/* Registration Page */}
          <div className="form-className col d-flex justify-content-center align-items-center border-0">
            <form
              className="form-control w-50  py-5 bg-light rounded-5"
              onSubmit={handleFormSubmit}
            >
              <div className="row g-3  d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center fw-bolder ">Create Account</h3>
                <div className="col-lg-10 ">
                  <input
                    type="text"
                    className="form-control p-3"
                    placeholder="User Name"
                    required
                    ref={nameRef}
                  />
                </div>
                <div className="col-lg-10  col-md-6">
                  <input
                    type="tel"
                    className="form-control p-3"
                    placeholder="+91 00000 00000"
                    required
                    min="10"
                    max="12"
                    ref={phoneRef}
                  />
                </div>
                <div className="col-lg-10  col-md-6">
                  <input
                    type="email"
                    className="form-control p-3"
                    placeholder="abc@gmail.com "
                    required
                    ref={emailRef}
                  />
                </div>
                <div className="col-lg-10  col-md-6 position-relative align-items-center justify-content-center d-flex">
                  <input
                    type={passwordType ? "text" : "password"}
                    className="form-control  p-3 position-relative"
                    placeholder="Password"
                    required
                    ref={passwordRef}
                  />
                  <button
                    className=" border-0 bg-white fs-3 p-1 position-absolute end-0 mx-3"
                    onClick={handlePasswordView}
                  >
                    {passwordType ? <IoEye /> : <BiSolidHide />}
                  </button>
                </div>
                <div className="col-lg-10  col-md-6 position-relative align-items-center justify-content-center d-flex">
                  <input
                    type={cPassowrd ? "text" : "password"}
                    className="form-control  p-3 position-relative"
                    placeholder="Confirm Password"
                    required
                    ref={confirmPasswordRef}
                  />
                  <button
                    className=" border-0 bg-white fs-3 p-1 position-absolute end-0 mx-3"
                    onClick={handleConfirmPassword}
                  >
                    {cPassowrd ? <IoEye /> : <BiSolidHide />}
                  </button>
                </div>
                <div className="col-lg-10  col-md-6 mb-3">
                  <button className="btn btn-primary w-100">
                    Create Account
                  </button>
                </div>
                <div className="col-lg-10 col-md-6 text-center mt-5">
                  <span className="">Already Have Account </span>
                </div>

                <div className="col-lg-10 col-md-6 text-center">
                  <Link to="/">
                    <button className="btn btn-primary w-100">Login</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
