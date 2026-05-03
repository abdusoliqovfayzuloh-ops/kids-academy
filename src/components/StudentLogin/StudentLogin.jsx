import React, { useEffect } from 'react'
import './StudentLogin.css'

function StudentLogin() {
  useEffect(() => {
    localStorage.setItem("loginStudent", JSON.stringify({
        body: "student", 
        img: "studentImg", 
        text: "Login to kids academy"
      })
    )
  },[])
  return (<form className='student__form'>
     <div className="student__content">
        <label htmlFor="studentEmail" className="student_label">Email</label>
        <input id='studentEmail' type="email" className="student_input" />
      </div>
     <div className="student__content">
        <label htmlFor="studentPassword" className="student_label">Password</label>
        <input id='studentPassword' type="password" className="student_input" />
      </div>
      <button className="student_btn">Login</button>
  </form>)
}

export default StudentLogin
