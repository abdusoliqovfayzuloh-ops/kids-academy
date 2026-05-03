import React, { useEffect } from 'react'

function AdminLogin() {
  useEffect(() => {
    localStorage.setItem("loginAdmin", JSON.stringify({
        body: "admin", 
        img: "adminImg", 
        text: "Admin Panel Login"
      })
    )
  },[])
  return (<>
  
  </>)
}

export default AdminLogin
