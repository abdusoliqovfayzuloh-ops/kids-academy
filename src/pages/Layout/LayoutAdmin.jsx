import React from 'react'
import HeaderAdmin from '../../components/Header/HeaderAdmin'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin'
import { Outlet } from 'react-router-dom'
import "./LayoutAdmin.css"


function LayoutAdmin() {
  return (<div className='layout__admin'>
    <HeaderAdmin/>
    <SidebarAdmin/>
    <Outlet/>
  </div>)
}

export default LayoutAdmin
