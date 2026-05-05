import React, { useEffect, useState } from 'react'
import './DashboardStudent.css'
import userIcon from "../../assets/icon/userIcon.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function DashboardStudent() {
  const [profile, setProfile] = useState({})
  const student = JSON.parse(localStorage.getItem("studentObject"))
  const navigate = useNavigate("")

  async function getProfile(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profil.json")
      const data = await res.data.find((profile) => profile.profileId == student?.profileId)
      console.log(data)
      setProfile(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getProfile()
  },[])
  return (<main className='site__main'>
     <section className="hero">
      <div className="conteyner hero__wraper">
        <div className="hero__content">
          <h1 className="hero_title">Hello, {student?.name}!</h1>
          <ul className="hero__list">
            <li className="hero_item">
              <strong className="hero_strong">Your email:</strong>
              <p className="hero_text">{profile?.email}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Your age:</strong>
              <p className="hero_text">{profile?.age} years old</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Your class:</strong>
              <p className="hero_text">{profile?.class}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Your phone:</strong>
              <p className="hero_text">{profile?.phone}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Your teacher:</strong>
              <p className="hero_text">{profile?.teacher}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Teacher phone:</strong>
              <p className="hero_text">{profile?.teacherPhote}</p>
            </li>
          </ul>
        </div>
        <img width={350} src={profile?.avatar == ""? userIcon : profile?.avatar} alt="" className="hero_img" />
      </div>
     </section>
     <section className="actions">
      <div className="conteyner actions__wraper">
        
      </div>
     </section>
  </main>)
}

export default DashboardStudent
