import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Student.css"

function Student() {
  const [students, setStudents] = useState([])

  async function getStudents(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json")
      const data = Object.values(res.data)
      setStudents(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getStudents()
  },[])

  return (<ul className='students__list'>
    {
      students?.map((student) => <li key={student.id} className="student_item">
        <div className="student__info">
          <img src={student.image} alt="" className="student_avatar" />
          <div className="student__content">
            <h3 className="student_name">{student.name}</h3>
            <p className="student_email">{student.email}</p>
          </div>
        </div>
        <div className="student__right">
          <span className="student_span">{student.number}</span> <br />
          <span className="student_span">{student.age} years old</span>
        </div>
      </li>)
    }
  </ul>)
}

export default Student
