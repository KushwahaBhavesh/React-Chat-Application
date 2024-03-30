
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserMenu = () => {
  const user = useSelector((state) => state.user.user);

  return <>
    <div className="card bg-transparent border-0  my-3">
      <div className="card-body p-4 text-black">
        <div className="d-flex align-items-center ">
          <div className="flex-shrink-0">
            <img
              src={user ? user.profile.profile_picture_url : null}
              width="45"
              height="45"
              alt="Generic placeholder image"
              className="rounded-circle  mt-3 "
            />
          </div>
          <div className="flex-grow-1 ms-3 d-flex justify-content-between">
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bold mb-0 text-info">
                {user.name}
              </span>
              <p className="m-0">online</p>
            </div>
            <div className="dropdown justify-content-center align-items-center d-flex ">
              <button className="border-0 bg-transparent" data-bs-toggle="dropdown">
                <FaChevronDown />
              </button>
              <ul className="dropdown-menu shadow">
                <li><Link className="dropdown-item" to="/admin">Dashboard</Link></li>
                <li><Link className="dropdown-item" to="/">Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default UserMenu
