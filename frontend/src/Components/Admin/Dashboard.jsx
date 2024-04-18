import React from "react";
import dashboard_svg from "../../assets/images/Dashboard.svg";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdOutlineContacts } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { LuMessageSquare } from "react-icons/lu";

const Dashboard = () => {
  const name = useSelector((state) => state.user.user.name);
  const profile = useSelector(state => state.user.user.profile_picture_url)
  const chat = useSelector(state => state.chat.chatList)

  console.log(chat);
  return (
    <>
      <div className="container-fluid vh-100">
        <div className="row gap-2">
          <div className="col-8">
            <div className="card border-0 border shadow">
              <div className="card-body ">
                <div className="row px-2">
                  <div className="col-8 ms-2 d-flex flex-column justify-content-center  align-items-start">
                    <h3 className="fw-bolder">Congratulations {name}🎉</h3>
                    <p className="">
                      you have success created account.
                      <br /> check your new profle
                    </p>
                  </div>
                  <div className="col px-2">
                    <img src={dashboard_svg} width={190} height={200} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="col">
            <div className="row">
              <div className="card boarder border-0 bg-transparent">
                
                  <div class="row gap-2 d-flex justify-content-center align-items-center">
                    <div class="col border bg-white rounded-4    p-3 d-flex flex-column justify-content-start align-items-start shadow">
                      <FaUser
                        className="border border-2 p-1 rounded-2"
                        color="green"
                        fontSize={35}
                      />
                      <span className="fs-5 mt-1">100</span>
                      <span className="fs-6 ">Total users</span>
                    </div>
                    <div class="col border bg-white rounded-4    p-3 d-flex flex-column justify-content-start align-items-start shadow">
                      <MdOutlineContacts
                      color="gold"
                        className="border border-2 p-1 rounded-2"
                        fontSize={35}
                      />
                      <span className="fs-5 mt-1">100</span>
                      <span className="fs-6 ">Total Contacts</span>
                    </div>
                    <div class="w-100"></div>
                    <div class="col border bg-white rounded-4    p-3 d-flex flex-column justify-content-start align-items-start shadow">
                      <HiMiniUserGroup
                        className="border border-2 p-1 rounded-2"
                        color="red"
                        fontSize={35}
                      />
                      <span className="fs-5 mt-1">100</span>
                      <span className="fs-6 ">Total Groups</span>
                    </div>
                    <div class="col border bg-white rounded-4    p-3 d-flex flex-column justify-content-start align-items-start shadow">
                      <LuMessageSquare
                      color="blue"
                        className="border border-2 p-1 rounded-2"
                        fontSize={35}
                      />
                      <span className="fs-5 mt-1">100</span>
                      <span className="fs-6 ">Total Chats</span>
                    </div>
                  </div>
                
              </div>
            </div>
            <div className="row mt-3">
              <div className="card py-2 shadow">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">username</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-auto" >
                    {chat.map(item => (
                      <tr>
                        <th scope="row">
                          <img src={item.profile?.profile_picture_url} className="rounded-circle" width={30} alt="profile" />
                        </th>
                        <td>{item.name}</td>
                        <td>online</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div >
        </div >
      </div >
    </>
  );
};

export default Dashboard;
