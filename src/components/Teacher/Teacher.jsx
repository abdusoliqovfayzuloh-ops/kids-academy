import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Teacher.css"

function Teacher() {
  const [teachers, setTeachers] = useState([])

  async function getTeachers(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json")
      const data = Object.values(res.data)
      const teachers = data.filter((teacher) => teacher.data.role == "admin")

      setTeachers(teachers)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getTeachers()
  },[])

  return (<ul className='teachers__list'>
      {
        teachers?.map((teacher, index) => <li key={teacher.data.id} className="teacher_item">
          <div className="teacher__content">
            <h3 className="teacher_name">{teacher.data.name}</h3>
            <p className="teacher_email">{teacher.email}</p>
          </div>
          <div className="teacher__info">
            <span className="teacher_role">{teacher.data.role}</span>
            <span className="teacher_index">{index + 1}</span>
          </div>
        </li>)
      }
  </ul>)
}

export default Teacher
