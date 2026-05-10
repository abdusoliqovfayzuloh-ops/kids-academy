import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./HeaderAdmin.css"

function HeaderAdmin({setFunctionName, setOpenModal}) {
  const navigate = useNavigate("")
  const location = useLocation()
  console.log(location.pathname)

  return (<header className='admin__header'>
    <div className="header__content">
      <button className="header_btn-admin" onClick={(evt) => {
        evt.preventDefault()

        if(location.pathname == "/layoutAdmin/dashboard/student" || location.pathname == "/layoutAdmin/dashboard/teacher"){
          setOpenModal(true)
          setFunctionName("AddUser")
        }else if(location.pathname == "/layoutAdmin/class"){
          setOpenModal(true)
          setFunctionName("AddGroup")
        }else if(location.pathname == "/layoutAdmin/shop"){
          setOpenModal(true)
          setFunctionName("AddProduct")
        }else if(location.pathname == "/layoutAdmin/info"){
          setOpenModal(true)
          setFunctionName("AddInfo")
        }else if(location.pathname == "/layoutAdmin/payment"){
          setOpenModal(true)
          setFunctionName("AddPayment")
        }else if(location.pathname == "/layoutAdmin/food"){
          setOpenModal(true)
          setFunctionName("Addfood")
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
