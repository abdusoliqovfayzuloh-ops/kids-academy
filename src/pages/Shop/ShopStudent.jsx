import React, { useEffect, useState } from 'react'
import "./ShopStudent.css"
import axios from 'axios'

function ShopStudent() {
  const [score, setScore] = useState({})
  const [products, setProducts] = useState([])
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
  async function getProducts(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Product.json")
      const data = await Object.values(res.data)
      console.log(data)
      setProducts(data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    getCoins()
    getProducts()
  },[])

  return (<main className='site__main'>
    <section className="hero shop">
      <div className="conteyner">
        <div className="hero__wraper-shop">
          
        </div>
      </div>
    </section>
    <section className="products">
      <div className="conteyner">
        <ul className="products__list">
          {
            products.map((product) => (<li key={product.id} className="products__item">
            <h3 className="products_subtitle">{product.category}</h3>
            <p className="products_text">{product.name}</p>
            <strong className="prducts_strong">{product.price}</strong>
          </li>))
          }
        </ul>
      </div>
    </section>
  </main>)
}

export default ShopStudent
