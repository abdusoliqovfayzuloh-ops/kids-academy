import React, { useEffect, useRef } from 'react'
import './StudentLogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function StudentLogin() {
  const inputEmail = useRef(null)
  const inputPassword = useRef(null)
  const navigate = useNavigate("")
  
  async function getStudent(email, password){
    try{
      const res = await axios.get(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json`)
      const student = await res.data.find((student) => student.email == email && student.password == password)
      
      if(student.role == "student"){
        navigate("/layoutStudent/dashboard")
        localStorage.setItem("studentObject", JSON.stringify(student))
      }else{
        navigate("/login/admin")
      }

      if(!res){
        throw new Error("tizim xatoligi")
      }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    localStorage.setItem("loginStudent", JSON.stringify({
        body: "student", 
        img: "studentImg", 
        text: "Login to kids academy"
      })
    )
  },[])

  return (<form className='student__form' onSubmit={(evt) => {
    evt.preventDefault()
    getStudent(inputEmail.current.value, inputPassword.current.value)
  }}>
     <div className="student__content">
        <label htmlFor="studentEmail" className="student_label">Email</label>
        <input id='studentEmail' type="email" className="student_input" ref={inputEmail}/>
      </div>
     <div className="student__content">
        <label htmlFor="studentPassword" className="student_label">Password</label>
        <input id='studentPassword' type="password" className="student_input" ref={inputPassword}/>
      </div>
      <button className="student_btn">Login</button>
  </form>)
}

export default StudentLogin
