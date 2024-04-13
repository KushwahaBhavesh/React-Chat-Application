import React from 'react'
import '../../Css/Spinner.css'

const messageSpinner = () => {
  return <>
  <div className='d-flex justify-content-center align-items-center p-5 h-100'>
    <span className="loader-message"></span>
    </div>
  </>
}

export default messageSpinner
