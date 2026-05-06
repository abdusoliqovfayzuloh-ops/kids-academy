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
      <section className='food-section'>
        <div className='container'>
          <h1>Food Menu</h1>
          {food && Object.keys(food).length > 0 ? (
            <div className='food-list'>
              {Object.entries(food).map(([key, item]) => (
                <div key={key} className='food-item'>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
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