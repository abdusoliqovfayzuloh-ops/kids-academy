import React, { useState, useEffect } from 'react'
import './FoodStudent.css'

function FoodStudent() {
  const [foodData, setFoodData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFoodData()
  }, [])

  const fetchFoodData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Food.json')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setFoodData(data || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching food data:', err)
      setError(err.message)
      setFoodData([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <main className='site__main'>
      <section className='food-section'>
        <div className='container'>
          <h1>Food Menu</h1>
          {foodData && Object.keys(foodData).length > 0 ? (
            <div className='food-list'>
              {Object.entries(foodData).map(([key, item]) => (
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