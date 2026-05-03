import React from 'react'
import { Link } from 'react-router-dom'
import "./HeaderStudent.css"
import homeIcon from '../../assets/icon/homeIcon.png'
import paymentIcon from '../../assets/icon/paymentIcon.png'
import shopIcon from '../../assets/icon/shopIcon.png'
import foodIcon from '../../assets/icon/foodIcon.png'
import classIcon from '../../assets/icon/classIcon.png'

function Header() {
  return (<header className='site__header'>
    <div className="conteyner header__wraper">
      <nav className="header__navbar">
        <ul className="navbar__list">
          <li className="navbar_item"><img width={35} src={homeIcon} alt="" /> <Link className='navbar_link' to={"/layoutStudent/dashboard"}>home</Link></li>
          <li className="navbar_item"><img width={30} src={paymentIcon} alt="" /> <Link className='navbar_link' to={"/layoutStudent/payments"}>payments</Link></li>
          <li className="navbar_item"><img width={25} src={shopIcon} alt="" /> <Link className='navbar_link' to={"/layoutStudent/shop"}>shop</Link></li>
          <li className="navbar_item"><img width={25} src={foodIcon} alt="" /> <Link className='navbar_link' to={"/layoutStudent/food"}>food</Link></li>
          <li className="navbar_item"><img width={35} src={classIcon} alt="" /> <Link className='navbar_link' to={"/layoutStudent/class"}>class</Link></li>
        </ul>
      </nav>
    </div>
  </header>)
}

export default Header
