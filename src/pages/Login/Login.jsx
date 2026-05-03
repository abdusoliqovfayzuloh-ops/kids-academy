import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./Login.css"
import studentImg from '../../assets/icon/studentImgLogin.png'
import adminImg from '../../assets/icon/adminImgLogin.png'

function Login() {
  const location = useLocation()
  const login = location.pathname == "/login/student" ? JSON.parse(localStorage.getItem("loginStudent")) : JSON.parse(localStorage.getItem("loginAdmin"))
  
  return (<main className={`site__main ${login?.body}`}>
    <section className="login">
      <div className="conteyner login__wraper">
        <div className="login__content">
          <h2 className="login_title">Welcome Back!</h2>
          <p className="login_text">{login?.text}</p>
        </div>
        <div className="login__link">
          <NavLink className={({isActive}) => isActive? "login_link-active" : "login_link"} to={"/login/student"}>Student Login</NavLink>
          <NavLink className={({isActive}) => isActive? "login_link-active" : "login_link"} to={"/login/admin"}>Admin Login</NavLink>
        </div>
        <Outlet/>
      </div>
    </section>
  </main>)
}

export default Login
