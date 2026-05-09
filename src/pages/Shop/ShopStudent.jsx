import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ShopStudent.css'

function ShopStudent() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinReward, setSpinReward] = useState(null)
  const [userCoins, setUserCoins] = useState(1250)

  async function getShopItems() {
    try {
      const res = await axios.get('https://kindergarten-4d40e-default-rtdb.firebaseio.com/Product.json')
      const data = res.data
      if (!data) {
        setItems([])
      } else if (Array.isArray(data)) {
        setItems(data)
      } else {
        setItems(Object.values(data))
      }
    } catch (err) {
      setError(err.message, 'Failed to load shop items')
    } finally {
      setLoading(false)
    }
  }

  const spinRewards = [10, 25, 50, 100, 15, 75, 30, 60]

  const handleSpin = () => {
    if (spinning) return
    
    setSpinning(true)
    const randomIndex = Math.floor(Math.random() * spinRewards.length)
    const reward = spinRewards[randomIndex]
    const spins = 5 + randomIndex / spinRewards.length
    const finalRotation = wheelRotation + spins * 360

    setWheelRotation(finalRotation)

    setTimeout(() => {
      setSpinReward(reward)
      setUserCoins(prev => prev + reward)
      setSpinning(false)
    }, 3000)
  }

  const closeRewardModal = () => {
    setSpinReward(null)
  }

  useEffect(() => {
    getShopItems()
  }, [])

  return (
    <main className='site__main'>
      <section className='shop-section'>
        <div className='conteyner shop-container'>
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

          {loading ? (
            <p className='shop-status'>Loading rewards...</p>
          ) : error ? (
            <p className='shop-status shop-error'>Error: {error}</p>
          ) : items.length === 0 ? (
            <p className='shop-status'>No rewards available right now.</p>
          ) : (
            <>
              <div className='shop-grid'>
                {items.map((item, index) => {
                  const title = item.name || item.title || `Reward ${index + 1}`
                  const cost = item.price ?? item.coin ?? item.coins ?? item.cost ?? item.value ?? 0
                  const image = item.image || item.icon || ''
                  const locked = item.locked === true || item.available === false || item.status === 'locked'
                  const badgeLabels = ['HOT', 'POPULAR', 'NEW', 'TRENDING']
                  const badge = item.badge || badgeLabels[index % badgeLabels.length]
                  return (
                    <article key={item.id || `${title}-${index}`} className={`shop-card ${locked ? 'shop-card--locked' : ''}`}>
                      <div className='shop-card__badge'>{badge}</div>
                      <div className='shop-card__media'>
                        {image ? <img src={image} alt={title} /> : <div className='shop-card__icon'>🎁</div>}
                      </div>
                      <div className='shop-card__body'>
                        <h2>{title}</h2>
                        <p className='shop-card__price'>
                          <span>{cost}</span> coins
                        </p>
                        {item.description && <p className='shop-card__desc'>{item.description}</p>}
                        <button disabled={locked} className='shop-card__button'>
                          {locked ? 'Locked' : 'Redeem'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className='shop-extra-row'>
                <div className='shop-extra-card shop-extra-card--bonus'>
                  <div className='extra-icon'>🎁</div>
                  <div>
                    <p className='extra-label'>Today's Bonus</p>
                    <strong>+50 coins</strong>
                  </div>
                  <button className='extra-button'>Claim</button>
                </div>
                <div className='shop-extra-card'>
                  <div className='extra-icon'>
                    <div 
                      className={`spin-wheel ${spinning ? 'spin-wheel--spinning' : ''}`}
                    >
                      🎡
                    </div>
                  </div>
                  <div>
                    <p className='extra-label'>Lucky Spin</p>
                    <strong>Win coins every day!</strong>
                  </div>
                  <button 
                    onClick={handleSpin}
                    disabled={spinning}
                    className='extra-button'
                  >
                    {spinning ? 'Spinning...' : 'Spin Now'}
                  </button>
                </div>
                <div className='shop-extra-card'>
                  <div className='extra-icon'>🏆</div>
                  <div>
                    <p className='extra-label'>Leaderboard</p>
                    <strong>See top collectors</strong>
                  </div>
                  <button className='extra-button'>View</button>
                </div>
              </div>

              {spinReward !== null && (
                <div className='reward-modal-overlay' onClick={closeRewardModal}>
                  <div className='reward-modal' onClick={e => e.stopPropagation()}>
                    <div className='reward-modal__content'>
                      <div className='reward-modal__icon'>🎉</div>
                      <h2>You Won!</h2>
                      <p className='reward-modal__amount'>
                        <span>+{spinReward}</span> coins
                      </p>
                      <button className='reward-modal__button' onClick={closeRewardModal}>
                        Awesome!
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default ShopStudent