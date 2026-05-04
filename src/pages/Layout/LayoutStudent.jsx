import React, { useState } from 'react'
import Header from '../../components/Header/HeaderStudent'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/SidebarStudent'

function LayoutStudent() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  return (<>
    {isOpenSidebar && <Sidebar/>}
    <Header setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar}/>
    <Outlet/>
  </>)
}

export default LayoutStudent
