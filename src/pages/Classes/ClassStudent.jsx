import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ClassStudent.css'

function ClassStudent() {
  const [classesData, setClassesData] = useState([])
  const studentObject = JSON.parse(localStorage.getItem("studentObject"))

  async function getClasses() {
    try{
      const res = await axios.get('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Classes.json')
      const classes = await Object.values(res.data)
      const data = await classes.find((group) => group.id == studentObject?.id)
      console.log(data)
      setClassesData(data.students)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getClasses()
  }, [])

  return (<main className='site__main'>
        <section className='classes-card'>
         <div className="conteyner">
            <div className='student-list'>
              {
                classesData.map((student, index) => (
                  <div key={student.id} className='student-item'>
                    <div className='student-item__left'>
                      <div>
                        <h3>{student.name}</h3>
                        <p>{studentObject?.email}</p>
                      </div>
                    </div>
                    <div className='student-item__right'>
                      <span className='student-coin'>{student.age} years old</span>
                      <span className='student-chip'>{index + 1}</span>
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