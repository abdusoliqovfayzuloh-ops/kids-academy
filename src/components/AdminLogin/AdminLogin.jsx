import React, { useEffect, useRef, useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
  const [emailAdmin, setEmailAdmin] = useState("")
  const [passwordAdmin, setPasswordAdmin] = useState("")
  const navigate = useNavigate("")
  
  async function getAdmin(){
    try{
      const res = await axios.get(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json`)
      const users = Object.values(res.data)
      const admin = await users.find((admin) => admin?.email == emailAdmin && admin?.password == passwordAdmin)
      
      if(admin.data.role == "admin"){
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
    getAdmin()
  }}>
     <div className="admin__content">
        <label htmlFor="adminEmail" className="admin_label">Email</label>
        <input id='adminEmail' placeholder='Enter your email' type="email" className="admin_input" onChange={(evt) => setEmailAdmin(evt.target.value)}/>
      </div>
     <div className="admin__content">
        <label htmlFor="adminPassword" className="admin_label">Password</label>
        <input id='adminPassword' placeholder='Enter your password' type="password" className="admin_input" onChange={(evt) => setPasswordAdmin(evt.target.value)}/>
      </div>
      <button className="admin_btn">Login as Admin</button>
  </form>)
}

export default AdminLogin
