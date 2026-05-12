import React, { useEffect, useRef, useState } from 'react'
import "./Modal.css"
import axios from 'axios'

function Modal({functionName, setOpenModal, openModal}) {
  const [newDate, setNewDate] = useState(0)
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [point, setPoint] = useState("")
  const [groupName, setGroupName] = useState("")
  const [paymentData, setPaymentData] = useState("")
  const [paymentInfo, setPaymentInfo] = useState("")
  const [groups, setGroups] = useState([])
  const [profile, setProfile] = useState({
    id: Number(Math.random().toFixed(10)),
    age: 0,
    number: 0,
    image: ""
  })
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
  const [info, setInfo] = useState({
    address:"",
    city:"",
    district:"",
    email:"",
    latitude:0,
    longitude:0,
    name:"",
    phone:0
  })
  const [infoData, setInfoData] = useState({
    breakfastTime:"",
    lessonEnd:"",
    lessonStart:"",
    lunchTime:"",
    quietTime:""
  })

  async function postUser(){
    try{
     if(role == "admin"){
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json",{
        data: {
          id: Number(Math.random().toFixed(10)),
          name: name,
          role: role
        },
        email: email,
        password: password
      })
      console.log(res.data)
    }else{
      const resLogin = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json",
        {
          data: {
            id: profile.id,
            name: name,
            group: groupName,
            role: role
          },
          email: email,
          password: password
        }
      )
      console.log(resLogin)
      const resProfile = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json",{
        ...profile,
        email: email, 
        name: name
      })
      console.log(resProfile)
      const resPayment = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment.json",{
        data:[
          {
            id: Number(Math.random().toFixed(10)),
            info: paymentInfo,
            time: paymentData
          }
        ],
        id: profile?.id
      })
      console.log(resPayment)
      const resScore = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score.json",{
        id: profile?.id,
        name: name,
        point: point,
        age: profile?.age
      })
      console.log(resScore)
      const oldGroup = groups?.find((group) => group.group == groupName)
      const resGroup = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group/${oldGroup?.firebaseKey}.json`,{
        data: [
          ...oldGroup.data,
          {
            id: Number(Math.random().toFixed(10)),
            age: profile?.age,
            student: name
          }
        ]
      })
      console.log(oldGroup.firebaseKey)
      console.log(resGroup)
     }
    }catch(err){
      console.log(err.message)
    }
  }
  async function postGroup(){
    try{
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json", {
        data: [
          {
            id: Number(Math.random().toFixed(10)),
            age: group?.phone,
            student: group?.teacher
          }
        ],
        id: Number(Math.random().toFixed(10)),
        ...group
      })
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
      const res = await axios.post("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Information.json", {
        data: {
          ...infoData
        },
        ...info
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
      const data = Object.entries(res.data).map(([key, value]) => ({firebaseKey: key,...value}))
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
       functionName == "Add User"? <div><div className="user__content-top">
          <div className="user__content">
            <label htmlFor="name" className="user_label">Change user <br /> name:</label>
            <input id='name' type="text" className="user_input" placeholder='user name' onChange={(evt) => setName(evt.target.value)}/>
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
            <input id='email' type="email" className="user_input" placeholder='user email' onChange={(evt) => setEmail(evt.target.value)}/>
          </div>
          <div className="user__content">
            <label htmlFor="password" className="user_label">Change user <br /> password:</label>
            <input id='password' type="text" className="user_input" placeholder='user password' onChange={(evt) => setPassword(evt.target.value)}/>
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
                <input id='point' type="number" className="user_input" placeholder='user start point' onChange={(evt) => setPoint(evt.target.value)}/>
              </div>
              <div className="user__content">
                <label htmlFor="group" className="user_label">Change user <br /> group:</label>
                <select id='group' className='user_select' defaultValue={""} onChange={(evt) => setGroupName(evt.target.value)}>
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
                <input id='data' type="date" className="user_input" onChange={(evt) => setPaymentData(evt.target.value)}/>
              </div>
              <div className="user__content">
                <label htmlFor="paymentInfo" className="user_label">Change payment info:</label>
                <input id='paymentInfo' type="text" className="user_input" placeholder='change payment info' onChange={(evt) => setPaymentInfo(evt.target.value)}/>
              </div>
            </div>
          </> : <></>
        }
       </div> : functionName == "Add Group"? <div className="group__content-top">
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
           <input id='foodName' type="text" className="food_input" placeholder='food name' onChange={(evt) => setFood({ ...food, foodName: evt.target.value })} />
         </div>
         <div className="food__content">
           <label htmlFor="foodImg" className="food_label">Change food <br /> img:</label>
           <input id='foodImg' type="text" className="food_input" placeholder='food img' onChange={(evt) => setFood({ ...food, foodImg: evt.target.value }) }/>
         </div>
         <div className="food__content">
           <label htmlFor="foodPoint" className="food_label">Change food time:</label>
           <input id='foodPoint' type="datetime-local" className="food_input" placeholder='food time' onChange={(evt) => setFood({ ...food, time: evt.target.value }) }/>
         </div>
       </div> : functionName == "Add Info"? <div><div className="info__content-top">
        <div className="info__content">
           <label htmlFor="infoName" className="info_label">Change info name:</label>
           <input id='infoName' type="text" className="info_input" placeholder='info name' onChange={(evt) => setInfo({...info, name: evt.target.value})}/>
         </div>
         <div className="info__content">
           <label htmlFor="infoCity" className="info_label">Change info <br /> city:</label>
           <input id='infoCity' type="text" className="info_input" placeholder='info city' onChange={(evt) => setInfo({...info, city: evt.target.value})}/>
         </div>
         <div className="info__content">
           <label htmlFor="infoAddress" className="info_label">Change info address:</label>
           <input id='infoAddress' type="text" className="info_input" placeholder='info address' onChange={(evt) => setInfo({...info, address: evt.target.value})}/>
         </div>
         <div className="info__content">
           <label htmlFor="infoDistrict" className="info_label">Change info district:</label>
           <input id='infoDistrict' type="text" className="info_input" placeholder='info district' onChange={(evt) => setInfo({...info, district: evt.target.value})}/>
         </div>
       </div>
       <div className="info__content-center">
        <div className="info__content">
          <label htmlFor="infoEmail" className="info_label">Change info email:</label>
          <input id='infoEmail' type="text" className="info_input" placeholder='info email' onChange={(evt) => setInfo({...info, email: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoPhone" className="info_label">Change info phone:</label>
          <input id='infoPhone' type="text" className="info_input" placeholder='info phone' onChange={(evt) => setInfo({...info, phone: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoLatitude" className="info_label">Change info latitude:</label>
          <input id='infoLatitude' type="text" className="info_input" placeholder='info latitude' onChange={(evt) => setInfo({...info, latitude: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoLongitude" className="info_label">Change info longitude:</label>
          <input id='infoLongitude' type="text" className="info_input" placeholder='info longitude' onChange={(evt) => setInfo({...info, longitude: evt.target.value})}/>
        </div>
       </div>
       <div className="info__content-bottom">
        <div className="info__content">
          <label htmlFor="infoStart" className="info_label">Change leasson start:</label>
          <input id='infoStart' type="text" className="info_input" placeholder='leasson start' onChange={(evt) => setInfoData({...infoData, lessonStart: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoEnd" className="info_label">Change leasson end:</label>
          <input id='infoEnd' type="text" className="info_input" placeholder='leasson end' onChange={(evt) => setInfoData({...infoData, lessonEnd: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoLunch" className="info_label">Change lunch time:</label>
          <input id='infoLunch' type="text" className="info_input" placeholder='lunch time' onChange={(evt) => setInfoData({...infoData, lunchTime: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoBreakfast" className="info_label">Change breakfast time:</label>
          <input id='infoBreakfast' type="text" className="info_input" placeholder='breakfast time' onChange={(evt) => setInfoData({...infoData, breakfastTime: evt.target.value})}/>
        </div>
        <div className="info__content">
          <label htmlFor="infoQuiet" className="info_label">Change quiet time :</label>
          <input id='infoQuiet' type="text" className="info_input" placeholder='leasson quiet' onChange={(evt) => setInfoData({...infoData, quietTime: evt.target.value})}/>
        </div>
       </div>
       </div> : <></>
      }
      <button className='modal_btn-submit'>submit</button>
  </form>)
}

export default Modal