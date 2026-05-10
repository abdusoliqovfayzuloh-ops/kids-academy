import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./GroupDetail.css"
import axios from 'axios'

function GroupDetail() {
  const params = useParams()
  const [group, setGroup] = useState({})

  async function getGroup(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json")
      const groups = Object.values(res.data)
      const data = groups.find((group) => group.group == params.groupName)
      console.log(data.data)

      setGroup(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getGroup()
  },[])

  return (<main className='admin__main'>
    <section className="group">
      <div className="group__wraper">
        <div className="group__content">
          <h2 className="group_title">{group?.teacher}</h2>
          <p className="group_text">{group?.phone}</p>
        </div>
        <strong className="group_strong">{group?.group}</strong>
      </div>
      <ul className="group__list">
        {
          group?.data?.map((group,index) => <li key={index} className="group_item">
            <div className="group__info">
              <h3 className="group_name">{group.student}</h3>
              <p className="group_email">{group.age} years old</p>
            </div>
            <span className="group_id">{group.id}</span>
          </li>)
        }
      </ul>
    </section>
  </main>)
}

export default GroupDetail
