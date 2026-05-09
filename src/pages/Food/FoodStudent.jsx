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
          {food && Object.keys(food).length > 0 ? (
            <div className='food-list'>
              {Object.entries(food).map(([key, item]) => (
                <div key={key} className='food-item'>
                  <img src={item.image} alt="" />
                  <div className='text-content'>
                    <h3>{item.name}</h3>
                    <p>{item.mealName}</p>
                    <p>{item.calories}</p>
                    <p>{item.day}</p>
                  </div>
                </div>
          
              ))}
            </div>
          ) : (
            <p>No food items available</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default FoodStudent