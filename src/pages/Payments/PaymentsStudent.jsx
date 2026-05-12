import React, { useEffect, useState } from 'react'
import './PaymentsStudent.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userIcon from "../../assets/icon/user Icon.png"

function PaymentsStudent() {
  const [payment, setPayment] = useState([])
  const studentObject = JSON.parse(localStorage.getItem("studentObject"))

  async function getPayment(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment.json")
      const payments = await Object.values(res.data)
      const data = await payments?.find((payment) => payment?.id == studentObject?.id)
      setPayment(data.data)
      console.log(data.data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getPayment()
  },[])

  return (
    <main className='site__main'>
      <section className="payments">
        <div className="conteyner payments__wraper">
          {
            payment?.map((payment, index) => <div key={index} className="payments__conetnt">
              <div className="payments__inner">
                <img width={50} src={userIcon} alt="" className="payments_img" />
                <div className="payments__info">
                  <p className="payments_text">{payment.info}</p>
                  <strong className="payments_strong">{payment.time}</strong>
                </div>
              </div>
              <span className="payments_index">{index + 1}</span>
            </div>)
          }
        </div>
      </section>
    </main>
  )
}

export default PaymentsStudent