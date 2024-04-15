import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../redux/feature/authReducer";
import { LOGOUT_SUCCESS } from "../../redux/feature/userReducer";
import { LOGOUT_CLOSE } from "../../redux/feature/chatReducer";

const UserMenu = ({ user }) => {
  // const user = useSelector((state) => state.user.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    try {
      axios
        .get("http://localhost:8000/api/auth/logout")
        .then((res) => {
          if (res.data && res.data.success) {
            dispatch(LOGOUT())
            dispatch(LOGOUT_SUCCESS())
            dispatch(LOGOUT_CLOSE())
            navigate('/')
          }
        })
        .catch((error) => console.log(error));
    } catch (error) { }
  };

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
                    <Link className="dropdown-item" onClick={handleLogout}>
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
