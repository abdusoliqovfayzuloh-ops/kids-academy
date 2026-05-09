import React from 'react'

function DashboardBox({title, numbers}) {
  return (<div className='dashboard__box'>
      <h3 className="box_title">{title}</h3>
      <strong className="box_strong">{numbers}</strong>
  </div>)
}

export default DashboardBox
