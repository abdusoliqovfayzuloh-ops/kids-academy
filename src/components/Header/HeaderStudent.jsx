import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./HeaderStudent.css"

function Header({setIsOpenSidebar, isOpenSidebar}) {
  const navigate = useNavigate("")

  return (<header className='site__header'>
    <div className="conteyner header__wraper">
      <div className="header__logo">
        <img src="img" alt="" className="header_logo" />
        <h2 className="header_title">kids academy <br /> <span style={{fontSize: 12}}>@gmail.com</span></h2>
      </div>
      <div className="header__btn">
        <button onClick={(evt) => {
           evt.preventDefault()
           setIsOpenSidebar(!isOpenSidebar)
        }} className="header_btn">open sidebar</button>
        <button onClick={(evt) => {
           evt.preventDefault()
           navigate("/layoutStudent/profile")
        }} className="header_btn">profil</button>
      </div>
    </div>
  </header>)
}

export default Header
