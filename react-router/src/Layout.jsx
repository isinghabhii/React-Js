import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router'

function Layout() {
    return (
        <>
            <Header /> {/* Same */}
            <Outlet /> {/* Change */}
            <Footer /> {/* Same */}
        </>
    )
}

export default Layout
