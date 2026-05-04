import React from 'react'
import homeIcon from '../../assets/icon/homeIcon.png'
import paymentIcon from '../../assets/icon/paymentIcon.png'
import shopIcon from '../../assets/icon/shopIcon.png'
import foodIcon from '../../assets/icon/foodIcon.png'
import classIcon from '../../assets/icon/classIcon.png'
import { NavLink } from 'react-router-dom'
import './SidebarStudent.css'

function Sidebar() {
  return (<aside className='site__sidebar'>
    <ul className="navbar__list">
      <li className="navbar_item"><img width={35} src={homeIcon} alt="" /> <NavLink className='navbar_link' to={"/layoutStudent/dashboard"}>home</NavLink></li>
      <li className="navbar_item"><img width={30} src={paymentIcon} alt="" /> <NavLink className='navbar_link' to={"/layoutStudent/payments"}>payments</NavLink></li>
      <li className="navbar_item"><img width={25} src={shopIcon} alt="" /> <NavLink className='navbar_link' to={"/layoutStudent/shop"}>shop</NavLink></li>
      <li className="navbar_item"><img width={25} src={foodIcon} alt="" /> <NavLink className='navbar_link' to={"/layoutStudent/food"}>food</NavLink></li>
      <li className="navbar_item"><img width={35} src={classIcon} alt="" /> <NavLink className='navbar_link' to={"/layoutStudent/class"}>class</NavLink></li>
    </ul>
  </aside>)
}

export default Sidebar
