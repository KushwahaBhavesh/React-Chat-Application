import React, { useRef, useState } from "react";
import "../../Css/Modal.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";

const SocialMediaEdit = ({ setIsOpen, setUpdate,user }) => {
  const mediaRef = useRef();
  const linkRef = useRef();
  const [account, setAccount] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const option = ["facebook", "youtube", "instagram", "telegram"];

  const handleAddBtn = ({}) => {
    const media = mediaRef.current.value;
    const URL = linkRef.current.value;
    if (URL !== "") {

      const newData = [
        ...account,
        {
          media,
          URL,
        },
      ];
      linkRef.current.value = ""
      setAccount(newData);
      setSelectedOptions([...selectedOptions, media]);
    } else {
      toast.error(" please provide URL")
    }
  };

  const disabledBtn =
    option.filter((item) => !selectedOptions.includes(item)).length === 0;

  const userID = useSelector(state => state.user.user._id)
  axios.defaults.withCredentials = true;
  const handleSubmit = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post(`http://localhost:8000/api/user/social-media/edit/${userID}`, { account }, config)

      console.log({ data });
      if (data) {
        toast.success(data.message)
        setUpdate()
        setIsOpen()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response)
    }
  };

  return (
    <>
      <div className="overlay">
        <div
          className="modal-container rounded-3 shadow bg-light p-4"
          style={{ width: "32em" }}
        >
          <div className="modal-body p-2 ">
            <h3 className="fw-bold mb text-center my-3">Social Media</h3>
            <div className="row">
              <div className="col-4">
                <select
                  className="form-select"
                  ref={mediaRef}
                  disabled={disabledBtn}
                >{option
                    .filter((item) => !selectedOptions.includes(item))
                    .map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Profile URL"
                  ref={linkRef}
                  disabled={disabledBtn}
                  required
                />
              </div>
              <div className="col-2">
                <button
                  className="btn btn-success"
                  onClick={handleAddBtn}
                  disabled={disabledBtn}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col p-3">
                <ul className="d-flex flex-column gap-2 list-unstyled">
                  {account.map((item) => (
                    <li className="p-2 bg-warning shadow">
                      <div className="row d-flex">
                        <div className="col-3">{item.media}</div>
                        <div className="col">{item.URL}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col d-flex gap-3 justify-content-end mt-5 ">
              <button
                className="btn btn-danger"
                onClick={setIsOpen}
                type="button"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMediaEdit;
