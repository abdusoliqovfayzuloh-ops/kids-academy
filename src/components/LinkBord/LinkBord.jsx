import React from 'react'
import "./LinkBord.css"
import { useNavigate } from 'react-router-dom'

function LinkBord({img, title, navigateUrl}) {
  const navigate = useNavigate("")
  return (<div className='link__bord' onClick={() => {
    navigate(navigateUrl)
  }}>
      <img width={80} src={img} alt="" className="bord_img" />
      <h3 className="bord_subtitle">{title}</h3>
  </div>)
}

export default LinkBord
