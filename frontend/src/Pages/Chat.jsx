import UserMenu from "../Components/ChatComponent/UserMenu";
import { useNavigate } from "react-router-dom";
import Contact from "../Components/ChatComponent/Contact";
import FloatMenu from "../Components/ChatComponent/FloatMenu";
import ChatContainer from "../Components/ChatComponent/ChatContainer";
import UserProfile from "../Components/ChatComponent/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { LOGIN, LOGOUT } from "../redux/feature/authReducer";
import LoadingSpinner from "../Components/Spinner/LoadingSpinner";
import { ACTIVE_USER, SET_SOCKET } from "../redux/feature/socketReducer";
import { io } from "socket.io-client";


const Chat = () => {
  const { user } = useSelector((state) => state.user);
  const { selectedUser, isopen } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuthenticated, loading } = useSelector(state => state.auth)
  const { socket } = useSelector(state => state.socket)


  // Socket Connection 
  const Endpoint = 'http://localhost:8000'
  useEffect(() => {
    if (isAuthenticated) {
      const socket = io(Endpoint);
      dispatch(SET_SOCKET(socket))

      socket?.emit("onlineUsers", user?._id)
      socket?.on('onlineUsers', (users) => {
        console.log("activeusers", users);
        dispatch(ACTIVE_USER(users))
      })

      // cleanup function
      return () => {
        socket.disconnect()
      }
    } else {
      if (socket) {
        socket.close();
        dispatch(SET_SOCKET(null))
      }
    }

  }, [isAuthenticated])

  // Socket emits ::: ===> socket.emit
  useEffect(() => {
    socket?.emit("onlineUsers", user?._id)
    socket?.on('onlineUsers', (users) => {
      console.log("activeusers", users);
      dispatch(ACTIVE_USER(users))
    })
  }, [socket])



  // page Validation
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/user/chat")
      .then((res) => {
        if (res && res.status === 201) {
          dispatch(LOGIN())
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          dispatch(LOGOUT())
          navigate("/");
        }

        // response for getting 401 error
        if (err.response.status === 401) {
          dispatch(LOGOUT());
          navigate("/");
        }

      });
  }, []);



  return (
    <>
      {loading ? <LoadingSpinner /> : (isAuthenticated ? (
        <section
          className="container-fluid vh-100"
          style={{ background: "#fff" }}
        >
          <div className="row vh-100">
            {/* First column */}
            <div className="col-3 bg-light">
              {/* Profile Avtar */}
              <UserMenu user={user} />

              {/* contact-list */}
              <div className="card bg-transparent border-0 mb-1">
                <Contact />
              </div>
              {/* float button  */}
              <FloatMenu />
            </div>

            {/* Second column */}
            <div className="col">
              <ChatContainer />
            </div>

            {/* third column */}
            {isopen ? (
              <div className={`col-3 bg-light ${!selectedUser ? "d-none" : ""}`}>
                <UserProfile />
              </div>
            ) : null}
          </div>
        </section>
      ) : null)}
    </>
  );
};

export default Chat;
