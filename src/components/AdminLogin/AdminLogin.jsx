import React, { useEffect, useRef } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const navigate = useNavigate("")
  
  async function getAdmin(email, password){
    try{
      const res = await axios.get(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json`)
      const admin = await res.data.find((admin) => admin.email == email && admin.password == password)
      
      if(admin.role == "admin"){
        navigate("/layoutAdmin/dashboard")
        localStorage.setItem("adminObject", JSON.stringify(admin))
      }else{
        navigate("/login/student")
      }

      if(!res){
        throw new Error("tizim xatoligi")
      }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    localStorage.setItem("loginAdmin", JSON.stringify({
        body: "admin", 
        img: "adminImg", 
        text: "Admin Panel Login"
      })
    )
  },[])

  return (<form className='admin__form' onSubmit={(evt) => {
    evt.preventDefault()
    getAdmin(inputEmail.current.value, inputPassword.current.value)
  }}>
     <div className="admin__content">
        <label htmlFor="adminEmail" className="admin_label">Email</label>
        <input id='adminEmail' placeholder='Enter your email' type="email" className="admin_input" ref={inputEmail}/>
      </div>
     <div className="admin__content">
        <label htmlFor="adminPassword" className="admin_label">Password</label>
        <input id='adminPassword' placeholder='Enter your password' type="password" className="admin_input" ref={inputPassword}/>
      </div>
      <button className="admin_btn">Login as Admin</button>
  </form>)
}

export default AdminLogin
