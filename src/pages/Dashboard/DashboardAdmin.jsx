import React, { useEffect, useState } from 'react'
import DashboardBox from '../../components/DashboardBox/DashboardBox'
import axios from 'axios'
import "./DashboardAdmin.css"
import { NavLink, Outlet } from 'react-router-dom'

function DashboardAdmin() {
  const [users, setUsers] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [groups, setGroups] = useState([])

  async function getUsers(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Login.json")
      const users = Object.values(res.data)
      const students = users.filter((user) => user?.data?.role == "student")
      const teachers = users.filter((user) => user?.data?.role == "admin")

      setUsers(users.length)
      setStudents(students.length)
      setTeachers(teachers.length)
    }catch(err){
      console.log(err.message)
    }
  }
  async function getGroups(){
    try{
      const res = await axios.get("https://kindergarten-4d40e-default-rtdb.firebaseio.com/Group.json")
      const groups = Object.values(res.data)
      setGroups(groups.length)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getUsers()
    getGroups()
  },[])

  return (<main className='admin__main'>
    <section className="admin__hero">
      <DashboardBox title={"Every users"} numbers={users}/>
      <DashboardBox title={"Every students"} numbers={students}/>
      <DashboardBox title={"Every teachers"} numbers={teachers}/>
      <DashboardBox title={"Every groups"} numbers={groups}/>
    </section>
    <section className="users">
      <ul className="users__list">
        <li className="users_item"><NavLink to={"/layoutAdmin/dashboard/student"} className={({isActive}) => isActive? "activeStudent": "notActiveStudent"}>Student</NavLink></li>
        <li className="users_item"><NavLink to={"/layoutAdmin/dashboard/teacher"} className={({isActive}) => isActive? "activeTeacher": "notActiveTeacher"}>Teacher</NavLink></li>
      </ul>
      <Outlet/>
    </section>
  </main>)
}

export default DashboardAdmin
