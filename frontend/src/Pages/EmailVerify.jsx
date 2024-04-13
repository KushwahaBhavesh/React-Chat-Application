import React, { useEffect, useState } from 'react'
import verify from '../assets/images/verify.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


const EmailVerify = () => {
  const [validURL, setValidURL] = useState(false)
  const params = useParams()
  axios.defaults.withCredentials = true
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/auth/${params.id}/verify/${params.token}`)
        console.log(data);
        setValidURL(true)
      }catch (error) {
        console.log(error);
        setValidURL(false)
      }
    }
    verifyEmail()
  },[params])
  return (<>
    {validURL ? (
      <section className='container-fluid vh-100 d-flex justify-content-center align-items-center'>
        <div className='card-body'>
          <img src={verify} alt='verify.png' />
          <h2>Email Verify successfully</h2>
          <Link to='/'><button className='btn btn-primary'>Login</button></Link>
        </div>
      </section>
    ) : (<p>invalid url</p >)
    }
  </>
  )
}

export default EmailVerify
