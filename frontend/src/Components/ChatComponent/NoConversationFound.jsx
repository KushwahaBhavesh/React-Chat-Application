import React from 'react'
import '../../Css/NoConversationFound.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NoConversationFound = () => {
  const {name} = useSelector(state => state.user.user)
  
  return <>
    <div className='d-flex flex-column justify-content-center align-items-center h-100 conversation'>
      <h1>Welcome {name}</h1>
     <Link to="" className='btn btn-warning'>Start New Chat</Link>
    </div>
  </>
}

export default NoConversationFound
