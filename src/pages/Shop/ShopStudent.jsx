import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ShopStudent.css'

function ShopStudent() {
  const [items, setItems] = useState([])
  const [userCoins, setUserCoins] = useState(0)
  const studentObject = JSON.parse(localStorage.getItem("studentObject"))

  async function getShopItems() {
    try {
      const res = await axios.get('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Product.json')
      const data = await Object.values(res.data)
      setItems(data)
    } catch (err) {
      console.log(err)
    }
  }
  async function getCoins(){
    try{
      const res = await axios.get('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Score.json')
      const scores = await Object.values(res.data)
      console.log(scores)
      const data = scores.find((score) => score.id == studentObject?.id)
      console.log(data)
      setUserCoins(data.point)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getShopItems()
    getCoins()
  }, [])

  return (
    <main className='site__main'>
      <section className='shop-section'>
        <div className='conteyner'>
          <div className='shop-hero'>
            <div className='shop-hero__coins'>
              <span className='coin-badge'>🪙</span>
              <span className='coin-value'>{userCoins}</span>
              <button className='coin-add'>+</button>
            </div>
            <div className='shop-hero__title-wrap'>
              <h1 className='shop-title'>Redeem Rewards</h1>
              <p className='shop-subtitle'>Collect coins and unlock amazing gifts!</p>
            </div>
          </div>
          <div className='shop-grid'>
            {items.map((item) => {
              return (
                <div key={item.id} className={`shop-card`}>
                  <div className='shop-card__media'><img src={item.img} alt="" /></div>
                  <div className='shop-card__body'>
                    <h2>{item.name}</h2>
                    <p className='shop-card__price'><span>{item.point}</span> coins</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ShopStudent