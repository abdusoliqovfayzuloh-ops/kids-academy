import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoStudent.css'

function InfoStudent() {
  const [info, setInfo] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)
  const navigate = useNavigate("")

  async function getInfo(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Information.json")
      console.log(res.data)
      setInfo(res.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getInfo()
  },[])

  const handleMapClick = (e, locationInfo) => {
    e.stopPropagation()
    setSelectedInfo(locationInfo)
  }

  const closeModal = () => {
    setSelectedInfo(null)
  }

  return (<main className='site__main'>
    <section className="info">
      <div className="conteyner info__wraper">
        {
          info?.map((info) => <div key={info.id} onClick={(e) => handleMapClick(e, info)} className="information">
          <div className="map-container">
            <iframe src={`https://maps.google.com/maps?q=${info.latitude},${info.longitude}&z=15&output=embed`} width="600" height="450" title="Location Map"></iframe>
            <div className="map-overlay">
              <span className="map-hint">🗺 Click to view details</span>
            </div>
          </div>
          <ul className="information__list">
            <li className="information__item">
              <h4 className="info_subtitle">City</h4>
              <p className="info_text">{info.city}</p>
            </li>
            <li className="information__item">
              <h4 className="info_subtitle">District</h4>
              <p className="info_text">{info.district}</p>
            </li>
            <li className="information__item">
              <h4 className="info_subtitle">Address</h4>
              <p className="info_text">{info.address}</p>
            </li>
            <li className="information__item">
              <h4 className="info_subtitle">Email</h4>
              <p className="info_text">{info.email}</p>
            </li>
            <li className="information__item">
              <h4 className="info_subtitle">Name</h4>
              <p className="info_text">{info.name}</p>
            </li>
            <li className="information__item">
              <h4 className="info_subtitle">Phone</h4>
              <p className="info_text">{info.phone}</p>
            </li>
          </ul>
         </div>
        )
        }
      </div>
    </section>

    {selectedInfo && (
      <div className="info-modal-overlay" onClick={closeModal}>
        <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="info-modal-header">
            <h2 className="info-modal-title">{selectedInfo.name}</h2>
            <button className="info-modal-close" onClick={closeModal}>✕</button>
          </div>
          
          <div className="info-modal-map">
            <iframe src={`https://maps.google.com/maps?q=${selectedInfo.latitude},${selectedInfo.longitude}&z=15&output=embed`} width="100%" height="280" title="Location Map" style={{border: 'none'}}></iframe>
          </div>
          <div className="info-modal-details">
            <div className="info-modal-grid">
              <div className="info-modal-item">
                <span className="info-modal-label">📍 CITY</span>
                <p className="info-modal-value">{selectedInfo.city}</p>
              </div>
              <div className="info-modal-item">
                <span className="info-modal-label">📌 DISTRICT</span>
                <p className="info-modal-value">{selectedInfo.district}</p>
              </div>
              <div className="info-modal-item">
                <span className="info-modal-label">🏠 ADDRESS</span>
                <p className="info-modal-value">{selectedInfo.address}</p>
              </div>
              <div className="info-modal-item">
                <span className="info-modal-label">📧 EMAIL</span>
                <p className="info-modal-value">{selectedInfo.email}</p>
              </div>
              <div className="info-modal-item">
                <span className="info-modal-label">📞 PHONE</span>
                <p className="info-modal-value">{selectedInfo.phone}</p>
              </div>
            </div>

            {selectedInfo.schedule && selectedInfo.schedule.length > 0 && (
              <div className="info-modal-schedule">
                <h3 className="info-modal-schedule-title">📅 SCHEDULE</h3>
                <div className="schedule-grid">
                  {selectedInfo.schedule.map((item, idx) => (
                    <div key={idx} className="schedule-item">
                      <span className="schedule-time">{item.time}</span>
                      <span className="schedule-activity">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </main>)
}

export default InfoStudent