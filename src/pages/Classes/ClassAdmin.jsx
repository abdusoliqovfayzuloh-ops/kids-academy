import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./ClassAdmin.css"
import groupIcon from "../../assets/icon/group.png"

function ClassAdmin() {
  const [groups, setGroups] = useState([])
  const searchInput = useRef(null)
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
  function searchGroup(searchValue){
    if(searchValue == "" || searchValue == "Every group" || searchValue == "every group"){
      getGroups()
    }else{
      const searchGroup = groups.filter((group) => group.group == searchValue)
      setGroups(searchGroup)
    }
  }
  useEffect(() => {
    getGroups()
  },[])

  return (<main className='admin__main'>
    <section className="search">
      <form className="search__form" onSubmit={(evt) => {
        evt.preventDefault()
        searchGroup(searchInput.current.value)
      }}>
        <input type="text" className="search_input" placeholder='Search group...' ref={searchInput}/>
        <button className="search_btn">search group</button>
      </form>
    </section>
    <section className="groups">
      <ul className="groups__list">
        {
          groups.map((group, index) => <li className="groups_item" key={index} onClick={() => {
           navigate(`/layoutAdmin/class/${group.group}`)
          }}>
            <img width={80} src={groupIcon} alt="" className='groups__icon' />
            <h3 className="groups_subtitle">{group.group}</h3>
          </li>)
        }
      </ul>
    </section>
  </main>)
}

export default ClassAdmin
