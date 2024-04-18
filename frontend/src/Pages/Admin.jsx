import React, { useState } from "react";
import Profile from "../Components/Admin/Profile";
import Dashboard from "../Components/Admin/Dashboard";
import { AiFillDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import axios from "axios";
import toast from "react-hot-toast";

const Admin = () => {
  const [active, setActive] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate()
  const sideMenu = [
    { menu: "Dashboard", link: "/admin/dashboard", icons: <AiFillDashboard /> },
    { menu: "Profile", link: "/admin/profile", icons: <CgProfile /> },
    { menu: "Users", link: "/admin/users", icons: <FaUsers /> },
    { menu: "Groups", link: "/admin/groups", icons: <MdGroups2 /> },
    { menu: "Messages", link: "/admin/messages", icons: <FiMessageSquare /> },
  ];


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    axios.get('http://localhost:8000/api/admin/logout').then(res => {
      console.log(res)
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/user/chat')
      }
    }).catch(err => console.log(err))
  }

  return (
    <>
      <section className="container-fluid bg-light">
        <div className="row gap-3">
          {/* Sidebar */}
          <div className={`col-12 col-md-2 col-sm-1 p-2 ${sidebarOpen ? 'd-block' : 'd-none'}`}>
            <div className="d-flex flex-column flex-shrink-0 px-4 vh-100 position-fixed shadow bg-white rounded-4" style={{ width: "inherit" }}>
              <Link to="/" className="d-flex align-items-center mb-3 mt-5 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <h3 className="fs-4 text-center">Web Chat</h3>
              </Link>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto gap-2">
                {sideMenu.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      to={item.link}
                      className={`nav-link ${active === item.menu ? "active" : ""}`}
                      onClick={() => setActive(item.menu)}
                    >
                      <span className={`me-2 ${sidebarOpen ? "" : "d-none"}`}>{item.icons}</span>
                      {sidebarOpen && item.menu}
                    </Link>
                  </li>
                ))}
                <li className="nav-item">
                  <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </div>
          </div>
          {/* Main Content */}
          <div className="col p-2 d-flex flex-column">
            {/* Navbar */}
            <nav className="navbar navbar-light bg-dark shadow rounded-4">
              <div className="container-fluid">
                <span className="navbar-toggler btn border-0" aria-label="Toogle" onClick={toggleSidebar}>
                  <TiThMenu color="white" fontSize={28} />
                </span>
                <span className="navbar-brand mb-0 h1 ms-3 text-light">Admin Pannel</span>
              </div>
            </nav>

            {/* Main Content based on Active Tab */}
            <div className="user profile mb-2  rounded-2 p-3 shadow">
              {active === "Dashboard" && <Dashboard />}
              {active === "Profile" && <Profile />}
              {active === "Users"}
              {active === "Groups"}
              {active === "Messages"}
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Admin;
