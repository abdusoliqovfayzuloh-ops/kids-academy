import React, { useEffect } from 'react'
import './DashboardStudent.css'
import userIcon from "../../assets/icon/userIcon.png"
import { useNavigate } from 'react-router-dom'

function DashboardStudent() {
  const student = JSON.parse(localStorage.getItem("studentObject"))
  const navigate = useNavigate("")
  useEffect(() => {
    console.log(student)
  },[])
  return (<main className='site__main'>
     <section className="hero">
      <div className="conteyner hero__wraper">
        <div className="hero__top">
          <div className="hero__top-content">
            <p className="hero_text">Welcome back!</p>  
            <h3 className="hero_title">{student?.name}</h3>
          </div>
          <button onClick={() => {
            navigate("/layoutStudent/profile")
          }} className="hero_btn-profil"><img width={60} src={userIcon} alt="" /></button>
        </div>
        <div className="hero__bottom">
          <img width={90} src={userIcon} alt="" className="hero_avatar" />
          <div className="hero__bottom-content">
            <p onClick={() => {
              navigate("/layoutStudent/profile")
            }}>profil</p>
          </div>
        </div>
      </div>
     </section>
     <section className="actions">
      <div className="conteyner actions__wraper">
        
      </div>
     </section>
  </main>)
}

export default DashboardStudent
