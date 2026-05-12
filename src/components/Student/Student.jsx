import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./Student.css"
import paymentIcon from "../../assets/icon/payment Icon.png"
import coinIcon from "../../assets/icon/up.png"
import AdminModal from '../MiniModal/AdminModal'

function Student() {
  const [students, setStudents] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [infoObject, setInfoObject] = useState({firebaseKey: "", functionName: ""})

  async function getStudents(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Profile.json")
      const data = Object.entries(res.data).map(([key, value]) => ({firebaseKey: key, ...value}))
      setStudents(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getStudents()
  },[])

  return (<><ul className='students__list'>
    {
      students?.map((student) => <li key={student.id} className="student_item">
        <div className="student__info">
          <img src={student.image} alt="" className="student_avatar" />
          <div className="student__content">
            <h3 className="student_name">{student.name}</h3>
            <p className="student_email">{student.email}</p>
          </div>
        </div>
        <div className="student__right">
          <div className="student__inner">
            <span className="student_span">{student.number}</span> <br />
            <span className="student_span">{student.age} years old</span>
          </div>
          <div className="student__btn">
            <img onClick={(evt) => {
              evt.preventDefault()
              setOpenModal(true)
              setInfoObject({firebaseKey:student.firebaseKey, functionName: "Add Payment"})
            }} width={56} src={paymentIcon} alt="" />
            <img onClick={(evt) => {
              evt.preventDefault()
              setOpenModal(true)
              setInfoObject({firebaseKey:student.firebaseKey, functionName: "Add Coin"})
            }} width={56} src={coinIcon} alt="" />
          </div>
        </div>
      </li>)
    }
  </ul>
  {
    openModal && <AdminModal setOpenModal={setOpenModal} infoObject={infoObject}/>
  }
  </>)
}

export default Student
