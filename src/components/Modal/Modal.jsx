import React, { useRef, useState } from 'react'
import "./Modal.css"
import axios from 'axios'

function Modal({functionName, setOpenModal, openModal}) {
  const [newDate, setNewDate] = useState(0)
  const nameInput = useRef(null)
  const [role, setRole] = useState("")
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const [profile, setProfile] = useState({
    id: 0,
    name: "",
    email: "",
    age: 0,
    number: 0,
    image: ""
  })
  const pointInput = useRef(null)
  const groupSelect = useRef(null)
  const paymnetData = useRef(null)
  const paymnetInfo = useRef(null)

  async function postUser(){
    if(role == "admin"){
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json",{
        data: {
          id: Number(Math.random().toFixed(10)),
          name: nameInput.current.value,
          role: role
        },
        email: emailInput.current.value,
        password: passwordInput.current.value
      })
      console.log(res.data)
    }else{
      console.log(role)
    }
  }

  return (<form className={"modal__form"} onSubmit={(evt) => {
    evt.preventDefault()
    postUser()
  }}>
      <div className="modal__wraper">
        <button onClick={(evt) => {evt.preventDefault(),setOpenModal(false)}} className='modal_btn'>&times;</button>
        <h2 className="modal_title">{functionName}</h2>
      </div>
      {
       functionName == "Add User"? <>
        <div className="user__content-top">
          <div className="user__content">
            <label htmlFor="name" className="user_label">Change user <br /> name:</label>
            <input id='name' type="text" className="user_input" placeholder='user name' ref={nameInput}/>
          </div>
          <div className="user__content">
            <label htmlFor="role" className="user_label">Change user <br /> role:</label>
            <select id='role' className='user_select' defaultValue="" onChange={(evt) => setRole(evt.target.value)}>
              <option disabled value={""}>Role</option>
              <option value="student">Student</option>
              <option value="admin">Teacher</option>
            </select>
          </div>
        </div>
        <div className="user__content-center">
          <div className="user__content">
            <label htmlFor="email" className="user_label">Change user <br /> email:</label>
            <input id='email' type="email" className="user_input" placeholder='user email' ref={emailInput}/>
          </div>
          <div className="user__content">
            <label htmlFor="password" className="user_label">Change user <br /> password:</label>
            <input id='password' type="text" className="user_input" placeholder='user password' ref={passwordInput}/>
          </div>
        </div>
        {
          role == "student"? <>
            <div className="user__content-bottom">
              <div className="user__content">
                <label htmlFor="age" className="user_label">Change user <br /> age:</label>
                <input id='age' type="number" className="user_input" placeholder='user age' onChange={(evt) => setProfile( {...profile, age: evt.target.value} )}/>
              </div>
              <div className="user__content">
                <label htmlFor="number" className="user_label">Change user <br /> number:</label>
                <input id='number' type="number" className="user_input" placeholder='user phone' onChange={(evt) => setProfile( {...profile, number: evt.target.value} )}/>
              </div>
              <div className="user__content">
                <label htmlFor="image" className="user_label">Change user <br /> image:</label>
                <input id='image' type="text" className="user_input" placeholder='user image' onChange={(evt) => setProfile( {...profile, image: evt.target.value} )}/>
              </div>
              <div className="user__content">
                <label htmlFor="point" className="user_label">Change user <br /> start point:</label>
                <input id='point' type="number" className="user_input" placeholder='user start point' ref={pointInput}/>
              </div>
              <div className="user__content">
                <label htmlFor="group" className="user_label">Change user <br /> group:</label>
                <select id='group' className='user_select' defaultValue={""} ref={groupSelect}>
                  <option disabled value={""}>Group</option>
                </select>
              </div>
            </div>
            <div className="user__payment">
              <div className="user__content">
                <label htmlFor="data" className="user_label">Change payment data:</label>
                <input id='data' type="date" className="user_input" ref={paymnetData}/>
              </div>
              <div className="user__content">
                <label htmlFor="paymentInfo" className="user_label">Change payment info:</label>
                <input id='paymentInfo' type="text" className="user_input" placeholder='change payment info' ref={paymnetInfo}/>
              </div>
            </div>
          </> : <></>
        }
       </> : <></>
      }
      <button className='modal_btn-submit'>submit</button>
  </form>)
}

export default Modal
