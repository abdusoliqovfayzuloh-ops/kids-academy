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
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json")
      const profiles = Object.values(res.data)
      const data = profiles.find((profile) => profile.id == student?.id)
      console.log(data)
      setProfile(data)
    }catch(err){
      console.log(err)
    }
  }
  async function patchProfile() {
    try {
      const res = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile/${profile?.id - 1}.json`,
        {
          ...profile,
          image: avatarInput.current.value,
          name: nameInput.current.value,
          age: ageInput.current.value,
          email: emailInput.current.value,
          number: phoneInput.current.value,
        }
      )
      console.log(res.data)
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
        <img width={355} src={profile?.image} alt="" className="hero_img" />
        <div className="hero__inner">
         <h1 className="hero_title-profile">{profile?.name}</h1>
         <p className="hero_text-profile">this is your profile</p>
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
            <input id='childName' type="text" className="profile_input" defaultValue={profile?.name} ref={nameInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="childAge" className="profile_label">Change your child age:</label>
            <input id='childAge' type="number" className="profile_input" defaultValue={profile?.age} ref={ageInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="childPhoto" className="profile_label">Change your child photo url:</label>
            <input id='childPhoto' type="text" className="profile_input" defaultValue={profile?.image} ref={avatarInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="phoneNumber" className="profile_label">Change your phone number:</label>
            <input id='phoneNumber' type="text" className="profile_input" defaultValue={profile?.number} ref={phoneInput}/>
          </div>
          <div className="profile__content">
            <label htmlFor="email" className="profile_label">Change your email:</label>
            <input id='email' type="email" className="profile_input" defaultValue={profile?.email} ref={emailInput}/>
          </div>
          <button className="profil_btn">submit</button>
        </form>
      </div>
    </section>
  </main>)
}

export default Profile
