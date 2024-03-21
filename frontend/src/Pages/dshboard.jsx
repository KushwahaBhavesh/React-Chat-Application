import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const dshboard = () => {
  const navigate = useNavigate()

  const [msg, setMsg] = useState('')
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.get("http://localhost:8000/api/auth/protected")
      .then(res => setMsg(res.data.message))
      .catch(err => {
        console.log(err)
        if (err.response.status === 404) {
          navigate('/')
        }
      })
  }, [])

  return <>
    <h1>protected:::{msg}</h1>
  </>
}

export default dshboard