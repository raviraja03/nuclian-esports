import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SiteFooter from '../Footer/Footer'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
        <SiteFooter />
    </div>
  )
}

export default Layout