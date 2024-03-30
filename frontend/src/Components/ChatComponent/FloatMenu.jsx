import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import CreateGroup from '../modal/CreateGroup'

const FloatMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return <>
    <div className="position-fixed dropup" style={{ zIndex: "999" }}>
      <button className="btn btn-dark d-flex justify-content-center align-items-center p-3 rounded-circle position-fixed"
        style={{ bottom: "10%", left: "19%" }}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ><FaPlus /></button>
      <ul className="dropdown-menu mb-2 shadow">
        <li><button className="dropdown-item " onClick={() => setIsOpen(true)}>Create Group</button></li>
      </ul>
    </div>
    <CreateGroup isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
  </>
}

export default FloatMenu
