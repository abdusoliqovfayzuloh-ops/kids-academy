import React, { useEffect, useState } from 'react'
import './InfoDetail.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function InfoDetail() {
  const [info, setInfo] = useState([])
  const params = useParams()

  async function getInfoDetail(){
    try{
      const res = await axios.get(`https://kindergarten-4d40e-default-rtdb.firebaseio.com/Location.json`)
      const informations = await Object.values(res.data)
      const data = await informations.find((info) => info.id == params.id)
      console.log(data)
      setInfo(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getInfoDetail()
  },[])

  return (<main className='site__main'>
      <section className="info__detail">
        
      </section>
  </main>)
}

export default InfoDetail
