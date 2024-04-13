import React from 'react'

const Dashboard = () => {
  return <>
    
    <div className=' d-flex justify-content-center align-items-center  mt-3 gap-5 mx-5'>
      <div className='card shadow'>
        <div className=' card-body d-flex flex-column'>
          <span>Logo</span>
          <span>user Nubmer</span>
          <span>total users</span>
        </div>
      </div>
      <div className='card shadow'>
        <div className='card-body d-flex flex-column'>
          <span>Logo</span>
          <span>user Nubmer</span>
          <span>total users</span>
        </div>
      </div>
      <div className='card shadow'>
        <div className='card-body d-flex flex-column'>
          <span>Logo</span>
          <span>user Nubmer</span>
          <span>total users</span>
        </div>
      </div>

    </div>
    <div className='graph-container mt-3 d-flex gap-4 mx-5'>
      <div className='d-flex flex-column'>
        <div className='card shadow' style={{ height: "24rem", width: "50rem" }}>
          <div className='card-body'>
            Graph container
          </div>
        </div>

      </div>
      <div className='card shadow' style={{ height: "39rem", width: "26rem" }}>
        <div className='card-body'>
          Graph container
        </div>
      </div>
    </div>
  </>
}

export default Dashboard
