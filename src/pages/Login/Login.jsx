import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import "./Login.css"
import studentImg from '../../assets/icon/studentImgLogin.png'
import adminImg from '../../assets/icon/adminImgLogin.png'
import axios from 'axios'

function Login() {
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate("")
  const login = location.pathname == "/login/student" ? JSON.parse(localStorage.getItem("loginStudent")) : JSON.parse(localStorage.getItem("loginAdmin"))
  
  async function getUser(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json")
      const data = await Object.values(res.data)
      const user = data.find((user) => user.email == email && user.password == password)
      console.log(user)
      if(user.data.role == "student"){
        navigate("/layoutStudent/dashboard")
        localStorage.setItem("studentObject", JSON.stringify(user.data))
      }else{
        navigate("/layoutAdmin/dashboard")
      }
    }catch(err){
      console.log(err.message)
      alert("Bu foydalanuvchi mavjud emas")
    }
  }

  return (<main className={`site__main`}>
    <section className="login">
      <div className="conteyner login__wraper">
        <div className="login__content">
          <img src={adminImg} alt="" className="login_img" />
          <h2 className="login_title">Welcome Back!</h2>
          <p className="login_text">hallo user change your email and password</p>
        </div>
        <form onSubmit={(evt) => {
          evt.preventDefault()
          getUser()
        }} className="login__form">
          <div className="login__content-form">
            <label htmlFor="email" className="login_label">Emailingizni kiriting</label>
            <input id='email' type="email" className="login_input" placeholder='change your email' onChange={(evt) => setEmail(evt.target.value)}/>
          </div>
          <div className="login__content-form">
            <label htmlFor="password" className="login_label">Passwordingizni kiriting</label>
            <input id='password' type="password" className="login_input" placeholder='change your password' onChange={(evt) => setPassword(evt.target.value)}/>
          </div>
          <button className="login_btn">login</button>
        </form>
      </div>
    </section>
  </main>)
}

export default Login
