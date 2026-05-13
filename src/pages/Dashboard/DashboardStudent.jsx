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
import instagram from '../../assets/icon/instagram.png'

function DashboardStudent() {
  const [profile, setProfile] = useState({})
  const [group, setGroup] = useState({})
  const student = JSON.parse(localStorage.getItem("studentObject"))
  const navigate = useNavigate("")

  async function getProfile(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json")
      const profiles = Object.values(res.data)
      const data = profiles.find((profile) => profile.id == student?.id)
      setProfile(data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function getGroup(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json")
      const groups = Object.values(res.data)
      const data = groups.find((group) => group.group == student?.group)
      console.log(data)
      setGroup(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getProfile()
    getGroup()
  },[])
  return (<main className='site__main'>
     <section className="hero">
      <div className="conteyner hero__wraper">
        <div className="hero__content">
          <h1 className="hero_title">Salom, {student?.name}!</h1>
          <ul className="hero__list">
            <li className="hero_item">
              <strong className="hero_strong">Sizning ismingiz:</strong>
              <p className="hero_text">{profile?.name}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Sizning yoshingiz:</strong>
              <p className="hero_text">{profile?.age} yoshdasiz</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Sizning guruhingiz:</strong>
              <p className="hero_text">{student?.group}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Sizning telefon raqamingiz:</strong>
              <p className="hero_text">{profile?.number}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">Sizning o'qtuvchingiz:</strong>
              <p className="hero_text">{group?.teacher}</p>
            </li>
            <li className="hero_item">
              <strong className="hero_strong">O'qtuvchi telefon raqami:</strong>
              <p className="hero_text">{group?.phone}</p>
            </li>
          </ul>
        </div>
        <img width={350} src={profile?.image == ""? userIcon : profile?.image} alt="" className="hero_img" />
      </div>
     </section>
     <section className="actions">
      <div className="conteyner">
        <h2 className="actions_title">Bo'limlar</h2>
        <div className="actions__instagram" onClick={(evt) => {
          evt.preventDefault()
          window.location.href = "https://www.instagram.com/kids.academy001?igsh=MWQxYXoyMDZ4OTN6dQ=="
        }}>
          <img width={90} src={instagram} alt="" className="instagram_img" />
          <div className="instagram__content">
            <h4 className="instagram_title">Join telegram</h4>
            <p className="instagram_text">t.me/kids_kids_kids_kids</p>
          </div>
        </div>
        <div className="actions__wraper">
          <LinkBord img={paymentIcon} title={"To'lovlar"} navigateUrl={"/layoutStudent/payments"}/>
          <LinkBord img={foodIcon} title={"Ovqat menu"} navigateUrl={"/layoutStudent/food"}/>
          <LinkBord img={userIcon} title={"Profil"} navigateUrl={"/layoutStudent/profile"}/>
          <LinkBord img={shop} title={"Magazin"} navigateUrl={"/layoutStudent/shop"}/>
          <LinkBord img={classIcon} title={"Guruh"} navigateUrl={"/layoutStudent/class"}/>
          <LinkBord img={infoIcon} title={"Malumotlar"} navigateUrl={"/layoutStudent/information"}/>
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
