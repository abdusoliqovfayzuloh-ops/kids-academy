import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./HeaderAdmin.css"

function HeaderAdmin({setFunctionName, setOpenModal}) {
  const navigate = useNavigate("")
  const location = useLocation()
  
  return (<header className='admin__header'>
    <div className="header__content">
      <button className="header_btn-admin" onClick={(evt) => {
        evt.preventDefault()

        if(location.pathname == "/layoutAdmin/dashboard/student" || location.pathname == "/layoutAdmin/dashboard/teacher"){
          setOpenModal(true)
          setFunctionName("Add User")
        }else if(location.pathname == "/layoutAdmin/class"){
          setOpenModal(true)
          setFunctionName("Add Group")
        }else if(location.pathname == "/layoutAdmin/shop"){
          setOpenModal(true)
          setFunctionName("Add Product")
        }else if(location.pathname == "/layoutAdmin/info"){
          setOpenModal(true)
          setFunctionName("Add Info")
        }else if(location.pathname == "/layoutAdmin/payment"){
          navigate("/layoutAdmin/dashboard")
          setFunctionName("Add Payment")
        }else if(location.pathname == "/layoutAdmin/food"){
          setOpenModal(true)
          setFunctionName("Add Food")
        }
      }}>{
          location.pathname == "/layoutAdmin/dashboard/student" || 
          location.pathname == "/layoutAdmin/dashboard/teacher"? "add user" : 
          location.pathname == "/layoutAdmin/class"? "add group" : 
          location.pathname == "/layoutAdmin/shop"? "add product" : 
          location.pathname == "/layoutAdmin/info"? "add info" : 
          location.pathname == "/layoutAdmin/payment"? "add payment" : 
          "add food"
      }</button>
    
      <button onClick={(evt) => {
          evt.preventDefault()
          navigate("/login")
      }} className="header_btn-admin">login</button>
    </div>
  </header>)
}

export default HeaderAdmin
