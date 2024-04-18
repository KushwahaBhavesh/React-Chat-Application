import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'


const AdminAuth = () => {
  const { name } = useSelector(state => state.user.user)
  const userId = useSelector(state => state.user.user._id)
  const navigate = useNavigate()
  const [passphrase, setPassphrase] = useState(null)
  const passprashRef = useRef()
  const [generated,setGenerated] = useState(null)

  // generating random passphrase
  const generatePassPhrase = async (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&";
    let Token = "";
    for (let i = 0; i < length; i++) {
      Token += characters.charAt(Math.floor(Math.random() * characters.length));
    }


    // Saving Token in database
    axios.defaults.withCredentials = true;
    const { data } = await axios.post("http://localhost:8000/api/admin/auth", { Token, userId })
    console.log(data);
    if (data?.success) {
      toast.success("Token generate successfully")
      setGenerated(data.Token)
    }
  }

  // handle access
  const handleAdminAccess = async () => {
    const password = passprashRef?.current.value;
      
    if (password === passphrase || generated) {
      Cookies.get('Token', passphrase)
      toast.success("Login Successfull");
      navigate('/admin/dashboard')
    } else {
      toast.error("Invalid passphrase")
    }
  }


  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/auth/fetch/${userId}`).
      then(res => (
        setPassphrase(res.data?.Token)
      )).catch(err => console.log(err))

  }, [])



  return <>
    <section className='container-fluid d-flex justify-content-center bg-warning align-items-center vh-100'>
      <div className='card p-3 w-25 rounded-4'>
        <div className='card-body '>
          <div className='row gap-4'>
            <h3 className='text-center '>Dashboard Access</h3>
            <input type='text' className='form-control border-0 border-bottom' placeholder='Username' value={name} disabled />
            <input type='text' className='form-control border-0 border-bottom' placeholder='Passphrase' ref={passprashRef} />
            <button className='btn btn-primary' onClick={handleAdminAccess}>Access</button>
            <span className='text-end my-0' style={{ cursor: "pointer" }}><Link to="#" className='text-dark fw-bold link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>forgot Passphrase?</Link></span>

            {passphrase ? (null) :(
              generated ? (<div className='position-relative'>
                <input type='text' value={generated} className='form-control form-control  position-relative' disabled />
              </div>):(<button className='btn btn-secondary'
              onClick={() => generatePassPhrase(8)}
            >Generate</button>)
            )}
          </div>

        </div>
      </div>

    </section>
  </>
}

export default AdminAuth



          