import React, { useEffect } from 'react'
import './AdminLogin.css'

function AdminLogin() {
  useEffect(() => {
    localStorage.setItem("loginAdmin", JSON.stringify({
        body: "admin", 
        img: "adminImg", 
        text: "Admin Panel Login"
      })
    )
  },[])
  return (<form className='admin__form'>
     <div className="admin__content">
        <label htmlFor="adminEmail" className="admin_label">Email</label>
        <input id='adminEmail' type="email" className="admin_input" />
      </div>
     <div className="admin__content">
        <label htmlFor="adminPassword" className="admin_label">Password</label>
        <input id='adminPassword' type="password" className="admin_input" />
      </div>
      <button className="admin_btn">Login as Admin</button>
  </form>)
}

export default AdminLogin
