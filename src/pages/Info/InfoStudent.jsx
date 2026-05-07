import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoStudent.css'

function InfoStudent() {
  const [info, setInfo] = useState([])
  const navigate = useNavigate("")

  async function getInfo(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Location.json")
      console.log(res.data)
      setInfo(res.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getInfo()
  },[])

  return (<main className='site__main'>
    <section className="info">
      <div className="conteyner info__wraper">
        {
          info?.map((info) => <div key={info.id} onClick={() => navigate(`/layoutStudent/information/${info.id}`)} className="information">
          <iframe src={`https://maps.google.com/maps?q=${info.latitude},${info.longitude}&z=15&output=embed`} width="600" height="450"></iframe>
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
  </main>)
}

export default InfoStudent
