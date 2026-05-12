import React, { useEffect, useState } from 'react'
import "./AdminModal.css"
import axios from 'axios'

function AdminModal({setOpenModal, infoObject}) {
  const [score, setScore] = useState({})
  const [payment, setPayment] = useState({})
  const [point, setPoint] = useState(0)
  const [paymentInfo, setPaymentInfo] = useState("")
  const [paymentData, setPaymentData] = useState("")

  async function getScore(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score.json") 
      const scors = await Object.entries(res.data).map(([key, value]) => ({firebaseKey:key, ...value }))
      const data = scors.find((score) => score?.firebaseKey == infoObject.firebaseKey)
      setScore(data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function getPayment(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment.json")
      const payments = Object.entries(res.data)?.map(([key, value]) => ({firebaseKey: key, ...value}))
      const data = payments.find((payment) => payment.firebaseKey == infoObject.firebaseKey)
      setPayment(data.data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function patchCoin() {
    try{
      const res = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score/${infoObject.firebaseKey}.json`,{
        ...score, 
        point: Number(score?.point) + Number(point)
      })
    }catch(err){
      console.log(err.message)
    }
  }
  async function patchPayment(){
    try{
      const res = await axios.patch(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment/${infoObject.firebaseKey}.json`,{ 
        data: [
          ...payment, 
          {
            id: Number(payment.length),
            info: paymentInfo,
            time: paymentData
          }
        ]
      })
      console.log(res.data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getScore()
    getPayment()
  },[])

  return (<form className='modal__form' onClick={(evt) => {
    evt.preventDefault()
    if(infoObject.functionName == "Add Coin"){
      patchCoin()
    }else{
      patchPayment()
    }
  }}>
    <div className="modal__content-top">
      <button className="modal_btn" onClick={(evt) => {
        evt.preventDefault()
        setOpenModal(false)
      }}>&times;</button>
      <h2 className="modal_title">{infoObject.functionName}</h2>
    </div>
    {
      infoObject.functionName == "Add Coin"? <div className="modal__content">
          <input type="number" className="modal_input" placeholder='change add how many coins' onChange={(evt) => setPoint(evt.target.value)}/>
        </div> : <>
        <div className="modal__content">
          <label htmlFor="data" className="modal_label">Change data payment:</label>
          <input id='data' type="date" className="modal_input" onChange={(evt) => setPaymentData(evt.target.value)}/>
        </div>
        <div className="modal__content">
          <label htmlFor="info" className="modal_label">Change info payment:</label>
          <input id='info' type="text" className="modal_input" placeholder='payment info' onChange={(evt) => setPaymentInfo(evt.target.value)}/>
        </div>
      </>
    }
    <button className="modal_btn-submit">submit</button>
  </form>)
}

export default AdminModal
