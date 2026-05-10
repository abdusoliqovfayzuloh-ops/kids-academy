import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ClassAdmin() {
  const [groups, setGroups] = useState([])
  const navigate = useNavigate("")

  async function getGroups(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json")
      const data = Object.values(res.data)
      setGroups(data)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getGroups()
  },[])

  return (<main className='admin__main'>
    <section className="groups">
      <ul className="groups__list">
        {
          groups.map((group, index) => <li className="groups_item" key={index} onClick={() => {
           navigate(`/layoutAdmin/class/${group.group}`)
          }}>{group.group}</li>)
        }
      </ul>
    </section>
  </main>)
}

export default ClassAdmin
