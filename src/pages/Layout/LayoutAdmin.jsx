import React, { useState } from 'react'
import HeaderAdmin from '../../components/Header/HeaderAdmin'
import SidebarAdmin from '../../components/Sidebar/SidebarAdmin'
import { Outlet } from 'react-router-dom'
import "./LayoutAdmin.css"
import Modal from '../../components/Modal/Modal'


function LayoutAdmin() {
  const [openModal, setOpenModal] = useState(false)  
  const [functionName, setFunctionName] = useState("")

  return (<div className='layout__admin'>
    <HeaderAdmin setOpenModal={setOpenModal} setFunctionName={setFunctionName}/>
    <SidebarAdmin/>
    {openModal && <Modal functionName={functionName} setOpenModal={setOpenModal}/>}
    <Outlet/>
  </div>)
}

export default LayoutAdmin
