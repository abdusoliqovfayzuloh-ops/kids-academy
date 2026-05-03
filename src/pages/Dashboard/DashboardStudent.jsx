import React, { useEffect } from 'react'
import './DashboardStudent.css'

function DashboardStudent() {
  const student = JSON.parse(localStorage.getItem("studentObject"))
  useEffect(() => {
    console.log(student)
  },[])
  return (<main className='site__main'>
     <section className="hero">
      <div className="conteyner hero__wraper">
        <div className="hero__top">
          <div className="hero__top-content">
            <p className="hero_text">Welcome back!</p>  
            <h3 className="hero_subtitle">{student.name}</h3>
          </div>
          <button className="hero_btn-profil">profil</button>
        </div>
        <div className="hero__bottom">
          <img src="" alt="" className="hero_img" />
          <div className="hero__bottom-content">
            
          </div>
        </div>
      </div>
     </section>
  </main>)
}

export default DashboardStudent
