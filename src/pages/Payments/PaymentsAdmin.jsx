import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./PaymentsAdmin.css"
import userIcon from "../../assets/icon/user Icon.png"

function PaymentsAdmin() {
  const [payments, setPayments] = useState([])

  async function getPayment() {
    try {
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Payment.json")
      const data = await Object.values(res.data)
      paymentArray(data)
    } catch (err) {
      console.log(err.message)
    }
  }
  function paymentArray(data){
    setPayments(data?.flatMap((item) => item.data))
  }
  useEffect(() => {
    getPayment()
  }, [])
  
  return (<main className='admin__main'>
    <section className="payments">
      <ul className="payments__list">
        {
          payments?.map((payment, index) => <li key={index} className="payments_item">
            <div className="payments__content">
              <img width={50} src={userIcon} alt="" className="payments_img" />
              <div className="payments__info">
                <p className="payments_text">{payment.info}</p>
                <strong className="payments_strong">{payment.time}</strong>
              </div>
            </div>
            <span className="payments_index">{index + 1}</span>
          </li>)
        }
      </ul>
    </section>
  </main>)
}

export default PaymentsAdmin