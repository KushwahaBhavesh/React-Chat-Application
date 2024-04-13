import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserMenu = ({ user }) => {
  // const user = useSelector((state) => state.user.user);

  return (
    <>
      <div className="card bg-transparent border-0  my-1">
        <div className="card-body p-2 text-black">
          <div className="d-flex align-items-center px-2 my-2">
            <img
              src={user ? user?.profile_picture_url : null}
              width="45"
              height="45"
              alt="Profile image"
              className="rounded-circle "
            />

            <div className="flex-grow-1 ms-3 d-flex justify-content-between align-items-start">
              <div
                className="d-flex flex-column justify-content- align-items-start"
                style={{ lineHeight: "1px" }}
              >
                <p className="fs-5 fw-bold">{user.name}</p>
                <span className="m-0">online</span>
              </div>
              <div className="dropdown justify-content-center align-items-center d-flex ">
                <button
                  className="border-0 bg-transparent"
                  data-bs-toggle="dropdown"
                >
                  <FaChevronDown />
                </button>
                <ul className="dropdown-menu shadow">
                  <li>
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
