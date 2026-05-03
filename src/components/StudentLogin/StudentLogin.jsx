import React, { useEffect } from 'react'

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
        <label htmlFor="" className="student_label"></label>
        <input type="text" className="student_input" />
      </div>
     <div className="student__content">
        <label htmlFor="" className="student_label"></label>
        <input type="text" className="student_input" />
      </div>
      <button className="student_btn">Login</button>
  </form>)
}

export default StudentLogin
