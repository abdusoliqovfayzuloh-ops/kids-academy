import React, { useEffect, useState } from 'react'
import './DashboardStudent.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LinkBord from '../../components/LinkBord/LinkBord'
import paymentIcon from '../../assets/icon/payment Icon.png'
import foodIcon from '../../assets/icon/food Icon.png'
import userIcon from '../../assets/icon/user Icon.png'
import shop from '../../assets/icon/shop.png'
import classIcon from '../../assets/icon/class.png'
import infoIcon from '../../assets/icon/about.png'
import telegram from '../../assets/icon/telegram.png'

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
      <div className="conteyner">
        <h2 className="actions_title">Quick Actions</h2>
        <div className="actions__wraper">
          <LinkBord img={paymentIcon} title={"Payment"} navigateUrl={"/layoutStudent/payments"}/>
          <LinkBord img={foodIcon} title={"Foot menu"} navigateUrl={"/layoutStudent/food"}/>
          <LinkBord img={userIcon} title={"Profile"} navigateUrl={"/layoutStudent/profile"}/>
          <LinkBord img={shop} title={"Shop"} navigateUrl={"/layoutStudent/shop"}/>
          <LinkBord img={classIcon} title={"Class"} navigateUrl={"/layoutStudent/class"}/>
          <LinkBord img={infoIcon} title={"Info"} navigateUrl={"/layoutStudent/information"}/>
        </div>
        <div className="actions__telegram" onClick={(evt) => {
          evt.preventDefault()
          window.location.href = "https://t.me/KIDS_ACADEMY777"
        }}>
          <img width={90} src={telegram} alt="" className="telegram_img" />
          <div className="telegram__content">
            <h4 className="telegram_title">Join telegram</h4>
            <p className="telegram_text">t.me/kids_kids_kids_kids</p>
          </div>
        </div>
      </div>
     </section>
  </main>)
}

export default DashboardStudent
