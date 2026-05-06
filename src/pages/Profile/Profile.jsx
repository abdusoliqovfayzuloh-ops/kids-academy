import React, { useEffect, useRef, useState } from 'react'
import "./Profile.css"
import axios from 'axios'

function Profile() {
  const [profile, setProfile] = useState({})
  const student = JSON.parse(localStorage.getItem("studentObject"))
  const avatarInput = useRef(null)
  const ageInput = useRef(null)
  const nameInput = useRef(null)
  const emailInput = useRef(null)
  const phoneInput = useRef(null)

  async function getProfile() {
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profil.json")
      const data = await res.data.find((profile) => profile.profileId == student?.profileId)
      setProfile(data)
    }catch(err){
      console.log(err)
    }
  }
  async function patchProfile() {
    try {

      const res = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profil/${profile.firebaseKey}.json`,
        {
          avatar: avatarInput.current.value,
          childName: nameInput.current.value,
          age: ageInput.current.value,
          email: emailInput.current.value,
          phone: phoneInput.current.value,
        })
      
      getProfile() 
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getProfile()
  },[])

  return (<main className='site__main'>
    <section className="hero">
      <div className="conteyner hero__wraper-profile">
        <img width={355} src={profile?.avatar} alt="" className="hero_img" />
        <div className="hero__inner">
         <h1 className="hero_title">{profile?.name} Profile</h1>
         <p className="hero_text">this is your profile</p>
        </div>
      </div>
    </section>
    <section className="profile">
      <div className="conteyner profile__wraaper">
        <form onSubmit={(evt) => {
          evt.preventDefault()
          patchProfile()
        }} className="profile__form">
          <div className="profile__content">
            <label htmlFor="childName" className="profile_label">Change your child name:</label>
            <input id='childName' type="text" className="profile_input" ref={nameInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="childAge" className="profile_label">Change your child age:</label>
            <input id='childAge' type="number" className="profile_input" ref={ageInput}/>
          </div>
          <div className="profile__content">
            <div className="profile__inner">
              <label htmlFor="childPhoto" className="profile_label">Change your child photo url:</label>
              <input id='childPhoto' type="text" className="profile_input" ref={avatarInput}/>
            </div>
          </div>
          <div className="profile__content">
            <label htmlFor="phoneNumber" className="profile_label">Change your phone number:</label>
            <input id='phoneNumber' type="number" className="profile_input" ref={phoneInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="email" className="profile_label">Change your email:</label>
            <input id='email' type="email" className="profile_input" ref={emailInput}/>
          </div>
          <button className="profil_btn">submit</button>
        </form>
      </div>
    </section>
  </main>)
}

export default Profile
