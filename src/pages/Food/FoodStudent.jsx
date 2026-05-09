import React, { useState, useEffect } from 'react'
import './FoodStudent.css'
import axios from 'axios'

function FoodStudent() {
  const [food, setFood] = useState([])

  async function getFood(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Food.json")
      setFood(res.data)
      console.log(res.data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getFood()
  }, [])

  return (
    <main className='site__main'>
      <section className="hero">
        <div className="conteyner food__wraper">
          <h1 className="food_title">Food Menu</h1>
        </div>
      </section>
      <section className='food-section'>
        <div className='conteyner'>
          <div className='food-list'>
            {food.map((food) => (
              <div key={food.id} className='food-item'>
                <img src={food.foodImg} alt="" />
                <div className='text-content'>
                  <h3>{food.foodName}</h3>
                  <p>{food.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default FoodStudent