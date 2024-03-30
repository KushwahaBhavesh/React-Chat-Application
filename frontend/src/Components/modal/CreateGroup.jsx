import React from "react";
import { IoClose } from "react-icons/io5";
import '../../Css/Modal.css'
const CreateGroup = ({ isOpen, setIsOpen }) => {

  if (!isOpen) return null

  return (
    <>
      <div className="overlay">

          <div className="modal-container rounded-4 shadow bg-light" style={{ width: "35em" }}>
            <div className="modal-body p-4 ">
              <div className=" d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-0">Create Groups</h2>
                <button className="border-0  bg-transparent fs-3" onClick={setIsOpen}>
                  <IoClose />
                </button>
              </div>

              <ul className="d-grid gap-4 my-4 list-unstyled small">
                <li className="d-flex gap-4">
                  <div className="col">
                    <h5 className="mb-0"> Group Name</h5>
                    <input
                      type="text"
                      placeholder="Group name"
                      className="form-control mt-2 px-3"
                    />
                  </div>
                </li>
                <li className="d-flex gap-4">
                  <div className="col">
                    <h5 className="mb-0">Select users</h5>
                    <input
                      type="text"
                      placeholder="Enter Name / Email / Phone "
                      className="form-control mt-2 px-3"
                    />
                  </div>
                </li>
                <li className="d-flex gap-4">Contact list</li>
              </ul>
              <button
                type="button"
                className="btn btn-lg btn-primary mt-5 w-100"
                data-bs-dismiss="modal"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>

    </>
  );
};

export default CreateGroup;
