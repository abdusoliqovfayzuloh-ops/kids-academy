import React from 'react'
import "./SidebarAdmin.css"
import logo from '../../assets/icon/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'

function SidebarAdmin() {
  const navigate = useNavigate("")
  return (<aside className='admin__sidebar'>
      <div className="sidebar__wraper">
        <div className="header__logo" onClick={() => {
          navigate("/layoutAdmin/dashboard")
        }}>
          <img src={logo} alt="" className="header_logo" />
          <h2 className="header_title">Kids academy <span style={{fontSize: 12, fontWeight: 400}}>Eevery child has potential</span></h2>
        </div>
        <ul className="sidebar__list">
          <li className="sidebar_item"><NavLink to={"/layoutAdmin/dashboard"} className={({ isActive }) => isActive ? "active" : ""}>dashboard</NavLink></li>
          <li className="sidebar_item"><NavLink to={"/layoutAdmin/class"} className={({ isActive }) => isActive ? "active" : ""}>group</NavLink></li>
          <li className="sidebar_item"><NavLink to={"/layoutAdmin/shop"} className={({ isActive }) => isActive ? "active" : ""}>shop</NavLink></li>
          <li className="sidebar_item"><NavLink to={"/layoutAdmin/payment"} className={({ isActive }) => isActive ? "active" : ""}>payment</NavLink></li>
          <li className="sidebar_item"><NavLink to={"/layoutAdmin/food"} className={({ isActive }) => isActive ? "active" : ""}>food</NavLink></li>
        </ul>
      </div>
  </aside>)
}

export default SidebarAdmin
