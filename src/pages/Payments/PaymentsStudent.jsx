import React from 'react'
import './PaymentsStudent.css'
import { useNavigate } from 'react-router-dom'

function PaymentsStudent() {
  const navigate = useNavigate("")
  return (
    <main className='site__main'>
      <section className='payments-section'>
        <div className='container'>
          <div className='payments-hero'>
            <button className='payments-back' onClick={() => navigate("/layoutStudent/dashboard")}>←</button>
            <h1>Payments</h1>
          </div>

          <div className='payments-summary'>
            <div>
              <span className='summary-title'>Total Due</span>
              <strong className='summary-value'>$1450</strong>
            </div>
            <button className='summary-action' type='button'>
              <span>$</span>
            </button>
          </div>

          <div className='payments-card'>
            <div className='payments-card__header'>
              <div>
                <h2>May 2026</h2>
                <p className='payment-date'>Due: 01.05.2026</p>
              </div>
              <span className='payment-status payment-status--unpaid'>Unpaid</span>
            </div>

            <div className='payments-card__body'>
              <div className='payment-field'>
                <span>Amount</span>
                <strong>$500</strong>
              </div>
            </div>

            <button className='pay-now-button'>Pay Now</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PaymentsStudent