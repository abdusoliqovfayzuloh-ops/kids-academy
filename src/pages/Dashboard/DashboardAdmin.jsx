import React from 'react'
import DashboardBox from '../../components/DashboardBox/DashboardBox'

function DashboardAdmin() {
  return (<main className='admin__main'>
    <section className="admin__hero">
      <DashboardBox title={"Every users"} numbers={120}/>
      <DashboardBox title={"Every students"} numbers={100}/>
      <DashboardBox title={"Every teachers"} numbers={20}/>
      <DashboardBox title={"Every groupss"} numbers={20}/>
    </section>
  </main>)
}

export default DashboardAdmin
