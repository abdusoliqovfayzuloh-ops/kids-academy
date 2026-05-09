import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ClassStudent.css'

function ClassStudent() {
  const [classesData, setClassesData] = useState([])
  const studentObject = JSON.parse(localStorage.getItem("studentObject"))

  async function getClasses() {
    try{
      const res = await axios.get('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json')
      const groups = await Object.values(res.data)
      const data = await groups.find((group) => group.group == studentObject?.group)
      console.log(data)
      setClassesData(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getClasses()
  }, [])

  return (<main className='site__main'>
        <section className="hero">
          <div className="conteyner teacher__wraper">
            <div className="teacher__content">
              <h1 className="teacher_title">{classesData?.teacher} teacher</h1>
              <p className="teacher_phone">{classesData?.phone}</p>
            </div>
          </div>
        </section>
        <section className='classes-card'>
         <div className="conteyner">
            <div className='student-list'>
              {
                classesData?.data?.map((student) => (
                  <div key={student.id} className='student-item'>
                    <div className='student-item__left'>
                      <div>
                        <h3>{student.student}</h3>
                      </div>
                    </div>
                    <div className='student-item__right'>
                      <span className='student-coin'>{student.age} years old</span>
                      <span className='student-chip'>{student.id}</span>
                    </div>
                  </div>
                ))
              }
            </div>
         </div> 
        </section>
    </main>)
}

export default ClassStudent