import React, { useEffect, useState } from 'react'
import "./ShopStudent.css"
import axios from 'axios'

function ShopStudent() {
  const [score, setScore] = useState({})
  const student = JSON.parse(localStorage.getItem("studentObject"))

  async function getCoins(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score.json")
      const coins = await Object.values(res.data)
      const data = await coins.find((score) => score.id == student.id)
      setScore(data)
      console.log(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getCoins()
  },[])

  return (<main className='site__main'>
    <section className="hero">
      <div className="conteyner">
        <div className="hero__wraper-shop">

        </div>
      </div>
    </section>
  </main>)
}

export default ShopStudent
