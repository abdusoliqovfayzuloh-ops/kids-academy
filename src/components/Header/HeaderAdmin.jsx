import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./HeaderAdmin.css"

function HeaderAdmin() {
  const navigate = useNavigate("")
  return (<header className='admin__header'>
    <button onClick={(evt) => {
        evt.preventDefault()
        navigate("/login")
    }} className="header_btn">login</button>
  </header>)
}

export default HeaderAdmin
