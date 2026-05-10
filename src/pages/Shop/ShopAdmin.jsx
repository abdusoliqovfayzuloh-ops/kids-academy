import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./ShopAdmin.css"

function ShopAdmin() {
  const [products, setProducts] = useState([])

  async function getProducts(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Product.json")
      const data = Object.values(res.data)
      setProducts(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getProducts()
  },[])

  return (<main className='admin__main'>
    <section className="admin__products">
      <ul className="products__list">
        {products?.map((product) => 
          <div key={product.id} className={`products-card`}>
            <div className='products-card__media'><img src={product.img} alt="" /></div>
            <div className='products-card__body'>
              <h2>{product.name}</h2>
              <p className='products-card__price'><span>{product.point}</span> coins</p>
            </div>
          </div>)
        }
      </ul>
    </section>
  </main>)
}

export default ShopAdmin
