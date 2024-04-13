import React, { useState } from "react";
import Profile from "../Components/Admin/Profile";
import Dashboard from "../Components/Admin/Dashboard";
import { AiFillDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { MdGroups2 } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const Admin = () => {
  const [active, setActive] = useState('Dashboard');
  const sideMenu = [
    { menu: "Dashboard", link: "/admin/dashboard", icons: <AiFillDashboard /> },
    { menu: "Profile", link: "/admin/profile", icons: <CgProfile /> },
    { menu: "Users", link: "/admin/users", icons: <FaUsers /> },
    { menu: "Groups", link: "/admin/groups", icons: <MdGroups2 /> },
    { menu: "Messages", link: "/admin/messages", icons: <FiMessageSquare /> },
  ];
  return (
    <>
      <section className="container-fluid bg-light">
        <div className="row gap-3">
          <div className="col-2 p-2">
            <div className="d-flex flex-column flex-shrink-0 p-3 vh-100 position-fixed shadow" style={{width:"inherit"}}>
              <Link
                to="/"
                className="d-flex align-items-center mb-3 mt-5 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
              >
                <span className="fs-4">Sidebar</span>
              </Link>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto gap-2">
                {sideMenu.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <Link
                      to={item.link}

                      className={`nav-link ${active === item.menu ? "active" : ""
                        }`}
                      aria-current="page"
                      onClick={() => setActive(item.menu)}
                    >
                      <span className="me-2">{item.icons}</span>
                      {item.menu}
                    </Link>
                  </li>
                ))}
                <li className="nav-item">
                  <button className="btn btn-danger w-100 mt-3">Log out</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-2 d-flex flex-column">
            <div className='user profile rounded-2 p-3 shadow' style={{ height: "3.5rem" }}>
              name
            </div>
            <div className="user profile mb-2  rounded-2 p-3 shadow">
              {active === "Dashboard" && <Dashboard />}
              {active === "Profile" && <Profile />}
              {active === "Users" && <Profile />}
              {active === "Groups" && <Dashboard />}
              {active === "Messages" && <Profile />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
