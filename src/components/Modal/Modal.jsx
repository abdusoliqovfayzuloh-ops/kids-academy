import React, { useEffect, useRef, useState } from 'react'
import "./Modal.css"
import axios from 'axios'

function Modal({functionName, setOpenModal, openModal}) {
  const [newDate, setNewDate] = useState(0)
  const nameInput = useRef(null)
  const [role, setRole] = useState("")
  const emailInput = useRef(null)
  const passwordInput = useRef(null)
  const [profile, setProfile] = useState({
    id: Number(Math.random().toFixed(10)),
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
  const [groups, setGroups] = useState([])
  const [group, setGroup] = useState({
    group: "",
    teacher: "",
    phone: 0
  })
  const [product, setProduct] = useState({
    name:"",
    img: "",
    point: 0
  })
  const [food , setFood] = useState({
    foodImg: "",
    time: "",
    foodName: ""
  })

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
      const resLogin = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json",
        {
          data: {
            id: profile.id,
            name: nameInput.current.value,
            group: groupSelect.current.value,
            role: role
          },
          email: emailInput.current.value,
          password: passwordInput.current.value
        }
      )
      const resProfile = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json",{
        ...profile,
        email: emailInput.current.value, 
        nameInput: nameInput.current.value,
        name: nameInput.current.value
      })
      const resPayment = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment.json",{
        data:[
          {
            id: Number(Math.random().toFixed(10)),
            info: paymnetInfo.current.value,
            time: paymnetData.current.value
          }
        ],
        id: profile?.id
      })
      const resScore = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score.json",{
        id: profile?.id,
        name: nameInput.current.value,
        point: pointInput.current.value,
        age: profile?.age
      })
      const oldGroup = groups?.find((group) => group.group == groupSelect.current.value)
      const resGroup = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group/${oldGroup?.firebaseKey}.json`,{
        data: [
          ...oldGroup.data,
          {
            id: Number(Math.random().toFixed(10)),
            age: profile?.age,
            student: nameInput.current.value
          }
        ]
      })
    }
  }
  async function postGroup(){
    try{
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json", {
        data: [],
        id: Number(Math.random().toFixed(10)),
        ...group
      })
      console.log(res.data)
    }catch(err) {
      console.log(err.message)
    }
  }
  async function postProduct(){
    try{
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Product.json", {
        id: Number(Math.random().toFixed()),
        ...product
      })
      console.log(res.data)
    }catch(err) {
      console.log(err.message)
    }
  }
  async function postInfo(){
    try{
      const res = await axios.post("url", {
        data: [],
        teacher: nameInput.current.value,
        phone: phoneInput.current.value,
        email: emailInput.current.value
      })
      console.log(res.data)
    }catch(err) {
      console.log(err.message)
    }
  }
  async function postFood(){
    try{
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Food.json", {
        id: Number(Math.random().toFixed(10)),
        ...food
      })
      console.log(res.data)
    }catch(err) {
      console.log(err.message)
    }
  }

  async function getGroups(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json")
      const data = Object.entries(res.data).map(([key, value]) => ({
        firebaseKey: key,
        ...value
      }))
      setGroups(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getGroups()
  },[])

  return (<form className={"modal__form"} onSubmit={(evt) => {
    evt.preventDefault()
    if(functionName == "Add User"){
      postUser()
    }else if(functionName == "Add Group"){
      postGroup()
    }else if(functionName == "Add Product"){
      postProduct()
    }else if(functionName == "Add Info"){
      postInfo()
    }else{
      postFood()
    }
    setOpenModal(false)
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
                  {
                    groups?.map((group, index) => <option key={index} value={`${group.group}`}>{group.group}</option>)
                  }
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
       </> : functionName == "Add Group"? <div className="group__content-top">
        <div className="group__content">
          <label htmlFor="groupName" className="group_label">Change group name:</label>
          <input id='groupName' type="text" className="group_input" placeholder='group name' onChange={(evt) => setGroup({...group, group: evt.target.value})}/>
        </div>
        <div className="group__content">
          <label htmlFor="groupTeacher" className="group_label">Change group teacher:</label>
          <input id='groupTeacher' type="text" className="group_input" placeholder='group teacher' onChange={(evt) => setGroup({...group, teacher: evt.target.value})}/>
        </div>
        <div className="group__content">
          <label htmlFor="teacherPhone" className="group_label">Change group teacher phone:</label>
          <input id='teacherPhone' type="text" className="group_input" placeholder='group teacher phone' onChange={(evt) => setGroup({...group, phone: evt.target.value})}/>
        </div>
       </div> : functionName == "Add Product"? <div className="product__content-top">
        <div className="product__content">
          <label htmlFor="productName" className="product_label">Change product name:</label>
          <input id='productName' type="text" className="product_input" placeholder='product name' onChange={(evt) => setProduct({...product, name: evt.target.value})}/>
        </div>
        <div className="product__content">
          <label htmlFor="productTeacher" className="product_label">Change product img:</label>
          <input id='productTeacher' type="text" className="product_input" placeholder='product img' onChange={(evt) => setProduct({...product, img: evt.target.value})}/>
        </div>
        <div className="product__content">
          <label htmlFor="teacherPhone" className="product_label">Change product teacher point:</label>
          <input id='teacherPhone' type="text" className="product_input" placeholder='product point' onChange={(evt) => setProduct({...product, point: evt.target.value})}/>
        </div>
       </div> : functionName == "Add Food"? <div className="food__content-top">
         <div className="food__content">
           <label htmlFor="foodName" className="food_label">Change food name:</label>
           <input id='foodName' type="text" className="food_input" placeholder='food name' onChange={(evt) => setProduct({ ...product, name: evt.target.value })} />
         </div>
         <div className="food__content">
           <label htmlFor="foodImg" className="food_label">Change food img:</label>
           <input id='foodImg' type="text" className="food_input" placeholder='food img' onChange={(evt) => setProduct({ ...product, img: evt.target.value }) }/>
         </div>
         <div className="food__content">
           <label htmlFor="foodPoint" className="food_label">Change food time:</label>
           <input id='foodPoint' type="datetime-local" className="food_input" placeholder='food time' onChange={(evt) => setProduct({ ...product, point: evt.target.value }) }/>
         </div>
       </div> : <></>
      }
      <button className='modal_btn-submit'>submit</button>
  </form>)
}

export default Modal
