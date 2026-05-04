import React from 'react'
import { Link } from 'react-router-dom'
import "./HeaderStudent.css"

function Header({setIsOpenSidebar, isOpenSidebar}) {
  return (<header className='site__header'>
    <div className="conteyner header__wraper">
      <div className="header__logo">
        <img src="" alt="" className="header_logo" />
        <h2 className="header_title">kids academy <br /> <span style={{fontSize: 12}}>@gmail.com</span></h2>
      </div>
      <button onClick={(evt) => {
         evt.preventDefault()
         setIsOpenSidebar(!isOpenSidebar)
      }} className="header_btn-sidebar">open sidebar</button>
    </div>
  </header>)
}

export default Header
