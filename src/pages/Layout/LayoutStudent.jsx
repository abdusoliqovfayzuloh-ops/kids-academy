import React, { useState } from 'react'
import Header from '../../components/Header/HeaderStudent'
import { Outlet } from 'react-router-dom'
import "./LayoutStudent.css"

function LayoutStudent() {
  return (<>
    <Header/>
    <Outlet/>
  </>)
}

export default LayoutStudent
