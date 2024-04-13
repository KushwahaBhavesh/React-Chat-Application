import React from 'react'
import '../../Css/Spinner.css'

const circularLoading = () => {

  return<div className='d-flex justify-content-center align-items-center flex-column'>
   <div className="lds-default "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
   <div className="loader-Loading"></div>
   </div>
}

export default circularLoading
