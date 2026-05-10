import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./FoodAdmin.css"

function FoodAdmin() {
  const [food, setFood] = useState([])

  async function getFood(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Food.json")
      const data = Object.values(res.data)

      setFood(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getFood()
  },[])

  return (<main className='admin__main'>
    <section className="admin__food">
      <div className="food__wraper-admin">
      {food.map((food) => (
          <div key={food.id} className='food-item-admin'>
            <img src={food.foodImg} alt="" />
            <div className='text-content-admin'>
              <h3>{food.foodName}</h3>
              <p>{food.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>)
}

export default FoodAdmin
