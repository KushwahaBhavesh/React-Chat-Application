import React from 'react'
import { LuSearch } from 'react-icons/lu'

const SearchInputBox = () => {
  return <>
    <div className="d-flex justify-content-start align-items-center">
      <input
        type="text"
        className="form-control  position-relative py-2 px-5 shadow rounded-5"
        placeholder="Search Friends"
      />
      <button className="btn fs-5 position-absolute ms-1 mb-1 border-0">
        <LuSearch />
      </button>
    </div>
  </>
}

export default SearchInputBox
