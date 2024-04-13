import React from 'react'

const AdminAuth = () => {
  return <>
    <section className='container-fluid d-flex justify-content-center bg-warning align-items-center vh-100'>
      <div className='card p-3 w-25 rounded-4'>
        <div className='card-body '>
        <div className='row gap-4'>
        <h3 className='text-center '>Dashboard Access</h3>
        <input type='text' className='form-control border-0 border-bottom' placeholder='Username' />
        <input type='text' className='form-control border-0 border-bottom' placeholder='SecretToken'  />
        <button className='btn btn-primary'>Access</button>
        </div>
        </div>
      </div>

    </section>
  </>
}

export default AdminAuth
